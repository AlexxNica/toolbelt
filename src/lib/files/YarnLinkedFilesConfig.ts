import { lstat, readdir, realpath, Stats } from 'fs-extra'
import * as glob from 'globby'
import { dirname, join } from 'path'
import { partition, unnest } from 'ramda'
import log from '../../logger'

const isNamespaceOrLink = (path: string, stat) => {
    return stat != null && ((path.startsWith('@') && stat.isDirectory()) || stat.isSymbolicLink())
}

const isLink = (_, stat) => {
    return stat != null && stat.isSymbolicLink()
}

export class YarnLinkedModulesConfig {

    public static async getConfig(appSrc: string) {
        const conf = new YarnLinkedModulesConfig(appSrc)
        await conf.init()
        return conf
    }

    private stack = []
    private graph: Record<string, string[]> = {}
    private _metadata: Record<string, string> = {}

    constructor(private appSrc: string) { }

    get metadata() {
        return this._metadata
    }

    public async init() {
        const allPackageJsonsFolders = (await glob([join('*', 'package.json')], { cwd: this.appSrc })).map((path: string) => dirname(path))
        this.stack.push(...allPackageJsonsFolders)
        while (this.stack.length > 0) {
            const moduleFolder = this.stack.pop()
            const dependencies = await this.discoverDependencies(moduleFolder, this.appSrc)
            this.graph[moduleFolder] = dependencies
            this.addSubDependenciesToStack(dependencies)
        }
    }

    private async getLinkedNodeModules(root: string): Promise<string[]> {
        try {
            const npmDirs = await this.getDirs(root, isNamespaceOrLink)
            const [scopedDirectories, regularModules] = partition(dir => dir.startsWith('@'), npmDirs)
            const getLinkedScopedModules = async (scopedDir: string) => {
                const dirs = await this.getDirs(join(root, scopedDir), isLink)
                return dirs.map(dir => `${scopedDir}/${dir}`)
            }

            const modulesPerScope = await Promise.map(scopedDirectories, getLinkedScopedModules)
            return [...regularModules, ...unnest(modulesPerScope)]
        } catch (err) {
            return []
        }
    }

    private async getDirs(root: string, predicate: (path: string, stat: Stats) => string): Promise<string[]> {
        const nullifyInvalidPaths = async (path: string) => {
            try {
                const stat = await lstat(join(root, path))
                return predicate(path, stat) ? path : null
            } catch (err) {
                return null
            }
        }

        const allDirs = await readdir(root)
        const validAndNullDirs = await Promise.all(allDirs.map(nullifyInvalidPaths))
        return validAndNullDirs.filter(dir => dir != null)
    }

    private addSubDependenciesToStack(deps: string[]) {
        for (const dep of deps) {
            if (dep in this.graph) {
                continue
            }
            this.stack.push(dep)
            this.graph[dep] = []
        }
    }

    private addModuleMetadata([moduleName, path]): string {
        if (moduleName in this._metadata && this._metadata[moduleName] !== path) {
            log.warn(`Found ${moduleName} from two sources as linked dependencies. Ignoring the one from ${path}`)
        } else {
            this._metadata[moduleName] = path
        }
        return moduleName
    }

    private async discoverDependencies(module: string, appSrc: string): Promise<string[]> {
        const path = module in this._metadata ? this._metadata[module] : join(appSrc, module)
        const depsRoot = join(path, 'node_modules')
        const moduleRealPath = async (moduleName: string): Promise<[string, string]> => {
            return [moduleName, await realpath(join(depsRoot, ...moduleName.split('/')))]
        }

        const modules = await this.getLinkedNodeModules(depsRoot)
        const realPaths = await Promise.all(modules.map(moduleRealPath))
        return realPaths.map(this.addModuleMetadata)
    }
}
