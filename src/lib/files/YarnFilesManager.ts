import * as glob from 'globby'
import { join, resolve } from 'path'
import { PassThrough } from 'stream'
import log from '../../logger'
import { pathToFileObject } from './ProjectFilesManager'
import { YarnSymlinkedModulesConfig } from './YarnLinkedFilesConfig'

const jsonToStream = (json: any) => {
  const stream = new PassThrough()
  stream.end(JSON.stringify(json))
  return stream
}

export class YarnFilesManager {
  private static LINKED_YARN_MODULES_IGNORED_FILES = [
    '.DS_Store',
    'README.md',
    '.gitignore',
    'CHANGELOG.md',
    'node_modules/**',
    '**/node_modules/**',
  ]

  public static async createFilesManager(projectSrc: string) {
    const yarnLinkedModulesConfig = await YarnSymlinkedModulesConfig.createConfig(projectSrc)
    return new YarnFilesManager(yarnLinkedModulesConfig)
  }

  private static async getFiles(npmModule: string, path: string) {
    const files = await glob(['**'], {
      cwd: path,
      ignore: YarnFilesManager.LINKED_YARN_MODULES_IGNORED_FILES,
      nodir: true,
    })
    return files.map(pathToFileObject(path, join('.linked_deps', npmModule))) as BatchStream[]
  }

  constructor(private linkConfig: YarnSymlinkedModulesConfig) {}

  get symlinkedDepsDirs() {
    return Object.values(this.linkConfig.metadata)
  }

  get yarnLinkedDependencies() {
    return this.linkConfig.symlinkedDependencies
  }

  public async getYarnLinkedFiles(): Promise<BatchStream[]> {
    const npmModules = Object.keys(this.linkConfig.metadata)
    const filesPerNpmModule = await Promise.all(
      npmModules.map(npmModule => {
        return YarnFilesManager.getFiles(npmModule, this.linkConfig.metadata[npmModule])
      })
    )

    filesPerNpmModule[0].forEach(el => {
      console.log(el.path)
    })

    const npmModulesFiles = filesPerNpmModule.reduce((acc, moduleFiles) => {
      return acc.concat(...moduleFiles)
    }, [])

    if (npmModulesFiles.length > 0) {
      npmModulesFiles.push({
        path: join('.linked_deps', '.config'),
        content: jsonToStream(this.linkConfig.toJson()),
      } as BatchStream)
    }

    return npmModulesFiles
  }

  public logSymlinkedDependencies() {
    const linkedDeps = this.yarnLinkedDependencies
    if (linkedDeps.length) {
      const plural = linkedDeps.length > 1
      log.info(`The following local dependenc${plural ? 'ies are' : 'y is'} linked to your app:`)
      linkedDeps.forEach(({ moduleName, path }) => log.info(`${moduleName} (from: ${path})`))
      log.info(
        `If you don\'t want ${plural ? 'them' : 'it'} to be used by your vtex app, please unlink ${
          plural ? 'them' : 'it'
        }`
      )
    }
  }

  public maybeMapLocalYarnLinkedPathToProjectPath = (path: string, projectPath: string) => {
    const absolutePath = resolve(projectPath, path)
    const linkedModules = this.yarnLinkedDependencies
    for (const moduleInfo of linkedModules) {
      if (absolutePath.startsWith(moduleInfo.path)) {
        return absolutePath.replace(moduleInfo.path, join('.linked_deps', moduleInfo.moduleName))
      }
    }

    return absolutePath
  }
}
