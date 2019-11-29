import { lstat, readdir, Stats, realpath } from 'fs-extra'
import * as glob from 'globby'
import { join, dirname } from 'path'
import { partition, unnest } from 'ramda'
import { PassThrough } from 'stream'
import { pathToFileObject, ProjectFilesManager } from './ProjectFilesManager'
import log from '../../logger'

const jsonToStream = (json: any) => {
  const stream = new PassThrough()
  stream.end(JSON.stringify(json))
  return stream
}

const isNamespaceOrLink = (path: string, stat) => {
  return stat != null && ((path.startsWith('@') && stat.isDirectory()) || stat.isSymbolicLink())
}

const isLink = (_, stat) => {
  return stat != null && stat.isSymbolicLink()
}

export class YarnLinkedFilesManager {
  private static LINKED_YARN_MODULES_IGNORED_FILES = ProjectFilesManager.DEFAULT_IGNORED_FILES

  private stack = []
  private graph: Record<string, string[]> = {}
  private metadata: Record<string, string> = {}

  constructor(public root: string) {}

  public async getConfig(appSrc: string) {
    const allPackageJsonsFolders = (await glob([join('*', 'package.json')], { cwd: appSrc })).map((path: string) => dirname(path))
    this.stack.push(...allPackageJsonsFolders)
    while (this.stack.length > 0) {
      const moduleFolder = this.stack.pop()
      const dependencies = await this.discoverDependencies(moduleFolder, appSrc)
      this.graph[moduleFolder] = dependencies
      this.addSubDependenciesToStack(dependencies)
    }

    return { metadata: this.metadata, graph: this.graph }
  }

  public async getYarnLinkedFiles(linkConfig: LinkConfig): Promise<BatchStream[]> {
    const getFiles = async (npmModule: string, path: string) => {
      const files = await glob(['**'], {
        cwd: path,
        ignore: YarnLinkedFilesManager.LINKED_YARN_MODULES_IGNORED_FILES,
        nodir: true,
      })
      return files.map(pathToFileObject(path, join('.linked_deps', npmModule))) as BatchStream[]
    }

    const npmModules = Object.keys(linkConfig.metadata)
    const filesPerNpmModule = await Promise.all(
      npmModules.map(npmModule => {
        return getFiles(npmModule, linkConfig.metadata[npmModule])
      })
    )

    const npmModulesFiles = filesPerNpmModule.reduce((acc, moduleFiles) => {
      return acc.concat(...moduleFiles)
    })

    if (npmModulesFiles.length > 0) {
      npmModulesFiles.push({
        path: join('.linked_deps', '.config'),
        content: jsonToStream(linkConfig),
      } as BatchStream)
    }

    return npmModulesFiles
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
    if (moduleName in this.metadata && this.metadata[moduleName] !== path) {
      log.warn(`Found ${moduleName} from two sources as linked dependencies. Ignoring the one from ${path}`)
    } else {
      this.metadata[moduleName] = path
    }
    return moduleName
  }

  private async discoverDependencies(module: string, appSrc: string): Promise<string[]> {
    const path = module in this.metadata ? this.metadata[module] : join(appSrc, module)
    const depsRoot = join(path, 'node_modules')
    const moduleRealPath = async (moduleName: string): Promise<[string, string]> => {
      return [moduleName, await realpath(join(depsRoot, ...moduleName.split('/')))]
    }

    const modules = await this.getLinkedNodeModules(depsRoot)
    const realPaths = await Promise.all(modules.map(moduleRealPath))
    return realPaths.map(this.addModuleMetadata)
  }
}
