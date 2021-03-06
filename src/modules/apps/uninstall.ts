import chalk from 'chalk'
import { apps } from '../../clients'
import { getAccount, getWorkspace } from '../../conf'
import { UserCancelledError } from '../../errors'
import { ManifestEditor, ManifestValidator } from '../../lib/manifest'
import log from '../../logger'
import { promptConfirm } from '../prompts'
import { parseArgs, validateAppAction } from './utils'

const { uninstallApp } = apps

const promptAppUninstall = (appsList: string[]): Promise<void> =>
  promptConfirm(
    `Are you sure you want to uninstall ${appsList.join(', ')} from account ${chalk.blue(
      getAccount()
    )}, workspace ${chalk.green(getWorkspace())}?`
  ).then(answer => {
    if (!answer) {
      throw new UserCancelledError()
    }
  })

const uninstallApps = async (appsList: string[]): Promise<void> => {
  for (const app of appsList) {
    const appName = ManifestValidator.validateApp(app.split('@')[0], true)
    try {
      log.debug('Starting to uninstall app', appName)
      await uninstallApp(appName)
      log.info(`Uninstalled app ${appName} successfully`)
    } catch (e) {
      log.warn(`The following app was not uninstalled: ${appName}`)
      log.error(`${e.response.status}: ${e.response.statusText}. ${e.response.data.message}`)
    }
  }
}

export default async (optionalApp: string, options) => {
  await validateAppAction('uninstall', optionalApp)
  const app = optionalApp || (await ManifestEditor.getManifestEditor()).appLocator
  const appsList = [app, ...parseArgs(options._)]
  const preConfirm = options.y || options.yes

  if (!preConfirm) {
    await promptAppUninstall(appsList)
  }

  log.debug('Uninstalling app' + (appsList.length > 1 ? 's' : '') + `: ${appsList.join(', ')}`)
  return uninstallApps(appsList)
}
