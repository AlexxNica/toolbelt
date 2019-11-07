import chalk from 'chalk'
import { split } from 'ramda'
import { getAccount, getLastUsedAccount, getLogin, getTokens, getWorkspace } from '../../conf'
import { CommandError } from '../../errors'
import log from '../../logger'
import { Token } from '../../Token'
import loginCmd, { saveCredentials } from './login'

export const switchAccount = async (account: string, options, previousAccount = getAccount()) => {
  const isValidAccount = /^\s*[\w-]+\s*$/.test(account)
  const workspace = options.w || options.workspace || 'master'

  if (!isValidAccount) {
    throw new CommandError('Invalid account format')
  } else if (!previousAccount) {
    throw new CommandError("You're not logged in right now")
  } else if (previousAccount === account) {
    throw new CommandError(`You're already using the account ${chalk.blue(account)}`)
  }

  const accountToken = new Token(getTokens()[account])
  if (accountToken.isValid()) {
    log.debug(`Token stored for ${account}/${accountToken.login} is still valid`)
    saveCredentials(accountToken.login, account, accountToken.token, workspace)
    log.info(
      `Logged into ${chalk.blue(getAccount())} as ${chalk.green(getLogin())} at workspace ${chalk.green(
        getWorkspace()
      )}`
    )
  } else {
    log.debug(`Token for ${account} isn't stored or isn't valid`)
    return loginCmd({ account, workspace })
  }
}

const hasAccountSwitched = (account: string) => {
  return account === getAccount()
}

export default async (account: string, options) => {
  if (account === '-') {
    account = getLastUsedAccount()
    if (account == null) {
      throw new CommandError('No last used account was found')
    }
  }

  const previousAccount = getAccount()
  // Enable users to type `vtex switch {account}/{workspace}` and switch
  // directly to a workspace without typing the `-w` option.
  const [parsedAccount, parsedWorkspace] = split('/', account)
  if (parsedWorkspace) {
    options = { ...options, w: parsedWorkspace, workspace: parsedWorkspace }
  }
  await switchAccount(parsedAccount, options)
  if (hasAccountSwitched(parsedAccount)) {
    log.info(`Switched from ${chalk.blue(previousAccount)} to ${chalk.blue(parsedAccount)}`)
  }
}
