import * as glob from 'globby'
import { join } from 'path'
import { PassThrough } from 'stream'
import { pathToFileObject, ProjectFilesManager } from './ProjectFilesManager'
import { YarnLinkedModulesConfig } from './YarnLinkedFilesConfig'

const jsonToStream = (json: any) => {
  const stream = new PassThrough()
  stream.end(JSON.stringify(json))
  return stream
}

export class YarnLinkedFilesManager {
  private static LINKED_YARN_MODULES_IGNORED_FILES = ProjectFilesManager.DEFAULT_IGNORED_FILES

  public static async getFiles(npmModule: string, path: string) {
    const files = await glob(['**'], {
      cwd: path,
      ignore: this.LINKED_YARN_MODULES_IGNORED_FILES,
      nodir: true,
    })
    return files.map(pathToFileObject(path, join('.linked_deps', npmModule))) as BatchStream[]
  }

  public async getYarnLinkedFiles(linkConfig: YarnLinkedModulesConfig): Promise<BatchStream[]> {
    const npmModules = Object.keys(linkConfig.metadata)
    const filesPerNpmModule = await Promise.all(
      npmModules.map(npmModule => {
        return YarnLinkedFilesManager.getFiles(npmModule, linkConfig.metadata[npmModule])
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
}
