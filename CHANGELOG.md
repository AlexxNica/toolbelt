# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Add update method to builder hub's error requesting to update toolbelt
- Add confirm prompt on `vtex publish`
- Add URL to changelog on update notification

### Refactor
- Refactor `vtex install` and `vtex uninstall`

## [2.81.4] - 2019-12-23
### Added
- Add message regarding publish process changes when trying to publish

## [2.81.3] - 2019-12-23
### Refactor
- Refactor `vtex deprecate`, `vtex undeprecate`, `vtex publish`

## [2.81.2] - 2019-12-19
### Added
- Use `v8-compile-cache` to slightly reduce commands startup

## [2.81.1] - 2019-12-18
### Changed
- Update `vtex setup` added lint deps

## [2.81.0] - 2019-12-17
### Added
- Show upload progress
- Show project original and compressed sizes
- Add a 90MB limit to project original size


### Removed
- Remove unnused client 

## [2.80.1] - 2019-12-16
### Fixed
- The command `vtex redirects export` no longer exports duplicate entries.

## [2.80.0] - 2019-12-16
### Added
- Periodically prompt user for feedback about toolbelt's usage experience.

## [2.79.4] - 2019-12-11
### Changed

- Update `typescript` to `^3.7.3`
- Update formatter and linter dependencies

## [2.79.3] - 2019-12-11

## [2.79.2] - 2019-12-10
### Removed

- Removed outdated scripts

## [2.79.1] - 2019-12-10
### Changed
- Lock dependencies versions up to minor changes

## [2.79.0] - 2019-12-06

### Added
- New command to validate a published app

### Fixed
- Use vtex/api on undeprecate request instead of axios 

## [2.78.6] - 2019-12-04
### Refactor
- Make `vtex init` never change the cloned app's manifest.

## [2.78.5] - 2019-12-04

### Refactor
- Delete legacy publish and link files

## [2.78.4] - 2019-12-03

## [2.78.3] - 2019-12-02

### Added
- Use `onUnsubscribe` event feature to notify users about links closing connection.

## [2.78.2] - 2019-11-27

### Fixed
- Use `vendor.appname@major.x` on `ABTester` and `Rewriter` clients constructors in order to use new `node-vtex-api` routing.

## [2.78.1] - 2019-11-21

### Fixed
- Update version of node-vtex-api to do requests with https

## [2.78.0] - 2019-11-19

### Changed
- Store tokens of other accounts visited in order to change account without opening browser when possible

## [2.77.15] - 2019-11-07

### Fixed
- Ignore errors warming up the route map after create a workspace

## [2.77.14] - 2019-11-06
### Fixed
- Fix copy to clipboard of `vtex local token` when it's executed on Mac OS.

## [2.77.13] - 2019-10-28
### Fixed
- Error `Unhandled exception` when generating local token/workspace/account, due to nonexistent display.

## [2.77.12] - 2019-10-25
### Changed
- Use `tenant-provisioner`'s `migrate` API to set account's editions.

### Fixed
- Remove CHANGELOG.md from list of ignored files

## [2.77.10] - 2019-10-21
### Fixed
- Fix `vtex setup` overriding the app's existing `package.json`.

## [2.77.9] - 2019-10-18

### Added

- Add `.git/**` to defaultIgnored files

## [2.77.8] - 2019-10-18

### Removed

- `inquirer` package

## [2.77.7] - 2019-10-16
### Fixed
- `vtex redirects import --reset` when the redirects index is empty in `vtex.rewriter`.

## [2.77.6] - 2019-10-15
### Changed
- Update `vtex setup` ESLint configuration to match current recipe instructions.

## [2.77.5] - 2019-10-11

## [2.77.4] - 2019-10-10

### Fixed

- `vtex init` for `react-guide`

## [2.77.3] - 2019-10-09

### Fix

- Typescript compile error that happened on darwin platform

## [2.77.2] - 2019-10-09

### Changed

- Update typescript version to 3.6.3

## [2.77.1] - 2019-10-02
### Changed
- Increase timeout and retries in the `rewriter` client.
- Sort the redirects list by the `from` prop before starting import.

## [2.77.0] - 2019-10-02

## [2.76.3] - 2019-10-02

### Added
- Ensure `node` >= v10
- Add debug logs on `node` version, OS basic info and command executed

## [2.76.2] - 2019-10-01
### Changed
- Use new rewriter API for redirects management.

## [2.76.1] - 2019-09-23
### Fixed
- Add `vtex test` to README.

## [2.76.0] - 2019-09-20
### Changed

- Update versions of eslint related packages added by `vtex setup`

## [2.75.0] - 2019-09-20
### Added
- Support for running tests on VTEX IO apps.

## [2.74.2] - 2019-09-18

### Fix

- Error logging using winston

## [2.74.1] - 2019-09-18

### Changed

- Enforce node version >= 10

## [2.74.0] - 2019-09-18

## [2.73.1] - 2019-09-11
### Fixed
- Correctly print error objects when the `--verbose` flag is set.

## [2.73.0] - 2019-09-10

## [2.72.0] - 2019-09-10

## [2.71.0] - 2019-09-05
### Changed
- Make update notifier yarn aware.

## [2.70.0] - 2019-09-05
- Parameter `-f` or `--force` in `vtex publish` to skip check for sem ver.

## [2.69.1] - 2019-09-04
### Fixed
- Add `vtex redirects import/export/delete` to README.

## Refactor
- Use `prettier` as formatter and `eslint` as linter

## [2.69.0] - 2019-09-03
### Added
- `vtex redirects import/export/delete` command for handling redirects in `vtex.rewriter`.

## [2.68.2] - 2019-09-03

## Refactor

- `vtex setup` command

## [2.68.1] - 2019-08-29

- Fix test

## [2.68.0] - 2019-08-28

- Add revenue and last 24h revenue to AB test status.

## [2.67.2] - 2019-08-28

- Upgrade `@vtex/api` to `^3.46.0`

## [2.67.1] - 2019-08-23

- Upgrade `chokidar` to major 3

## [2.67.0] - 2019-08-21
### Added
- Parameter `-f` or `--force` in `vtex install` to skip check for route conflicts.

## [2.66.4] - 2019-08-19
### Fixed
- Do not throw error when log is an empty string.

## [2.66.3] - 2019-08-19
### Changed
- Stop ignoring eslint configuration files.

## [2.66.2] - 2019-08-15

## [2.66.1] - 2019-08-15
- Use jest as testing framework

## [2.66.0] - 2019-08-07
### Changed
- Filter out artificial JSON logs that are meant to be logged to splunk, except in verbose mode

## [2.65.6] - 2019-08-07
### Changed
- Add a header to send debug requests to the runtime instead of the app.

## [2.65.5] - 2019-08-06
### Changed
- Do not show `masterdata-graphql-guide` in `vtex init` for users outside VTEX.


## [2.65.4] - 2019-08-06
### Added
- `vtex init` does not show unnecessary templates for users outside VTEX.

## [2.65.3] - 2019-07-25
### Fixed
- `vtex update` correctly shows available updates for runtimes.

## [2.65.2] - 2019-07-19
### Fixed
- Add `ignore-engines` flag when running `yarn`.

## [2.65.1] - 2019-07-18
### Changed
- Stop saving sticky-host locally until issue with Builder-hub's `fork-ts-checker-webpack-plugin` issue is resolved.

## [2.65.0] - 2019-06-28
### Added

- Support `-` to switch back to previous account or workspace.

## [2.64.3] - 2019-06-26
### Fixed
- On `vtex update`, correctly show when there are no updates available.

## [2.64.2] - 2019-06-25
### Fixed
- A/B testing status tables.

## [2.64.1] - 2019-06-25
### Added
- Account name is displayed when changing workspaces.

## [2.64.0] - 2019-06-24
### Changed
- `vtex update` calls the housekeeper API to check available updates.

## [2.63.9] - 2019-06-18
### Added
- Display account name on workspace reset prompt
- Remove environment on greetings prompt

## [2.63.8] - 2019-06-17

### Changed
- Removes deprecated staging environment support

## [2.63.7] - 2019-06-14

## [2.63.6] - 2019-06-05
### Changed
- Use yellow instead of red for `vtex update` table headers color

## [2.63.5] - 2019-06-04
### Fixed
- Use app's root as `cwd` when running scripts during `vtex release`.

## [2.63.4] - 2019-06-04
### Changed
- Bump `axios` version.

## [2.63.3] - 2019-05-31
### Fixed
- Fix `vtex init`.

## [2.63.2] - 2019-05-30
### Added
- Add graphql example.

## [2.63.1] - 2019-05-30
### Added
- Add admin example.

## [2.63.0] - 2019-05-29
### Added
- `vtex ls` now shows apps inherited by the account's edition.

## [2.62.0] - 2019-05-28
### Added
- `vtex edition` and `vtex edition set` commands to manipulate account's editions.

## [2.61.1] - 2019-05-27
### Fixed
- Check if the returned data is really from the `vtex.admin-login` app when testing if it is installed in the current account/workspace.

## [2.61.0] - 2019-05-27
### Added
- Add `support` command, which allows logging into another account that has your support app installed.

### Changed
- Added funcionality to `browse` command to allow logging into an admin with a support token.

## [2.60.2] - 2019-05-28
### Fixed
- Use double quotes around the resolved `yarn` path so `vtex link` works correctly on Windows platforms.

## [2.60.0] - 2019-05-25
### Added
- Add `--qr` flag to the `browse` command, that outputs a QR code; intended for mobile devices.

## [2.59.0] - 2019-05-24

## [2.58.0] - 2019-05-24
### Changed
- Use new login route whenever it is available in the current workspace.

## [2.58.0] - 2019-05-21
### Added
- `vtex url` command to print the base URL for the current account, workspace and environment.

## [2.57.1] - 2019-05-21
### Changed
- Stop making `vtex update` attempt to update app major.

## [2.57.0] - 2019-05-21
### Changed
- Add JSON schema to Manifest.

## [2.56.7] - 2019-05-15
### Changed
- Enable saving StickyHost locally.

## [2.56.6] - 2019-05-13

## [2.56.5] - 2019-05-13
### Added
- Always run `yarn` locally as an initial step of `vtex link` and `vtex publish` for `./node` and `./react` folders.

## [2.56.4] - 2019-05-10
### Fixed
- Correctly resolve app root for the `vtex release` command.

## [2.56.3] - 2019-05-10
### Fixed
- Improved Node debugger stability.

## [2.56.2] - 2019-05-08
### Changed
- Running `vtex setup` on every `vtex link` is temporarily disabled until `vtex setup` becomes less intrusive.

### Fixed
- Minor fix to eslint configuration in `vtex setup`.

## [2.56.1] - 2019-05-08
### Changed
- Temporarily disable saving StickyHost locally until routing behavior is fixed.

## [2.56.0] - 2019-05-08
### Changed
- Move typings fetching to the `vtex setup` command.
- Make `vtex setup` download tslint configuration (react and node).
- Make `vtex setup` merge tsconfig entries from builder-hub.
- `vtex link` runs `vtex setup` by default, except when run with option `no-setup`.

## [2.55.7] - 2019-05-08
### Fixed
- Wrap `apps` client promises in Bluebird, so we can use `.tap`.

## [2.55.6] - 2019-05-08
### Fixed
- Check and inform if ab-tester `status` route returns null results.

## [2.55.5] - 2019-05-02
### Added
- Generic `vtex browse` command for browsing the store.

## [2.55.4] - 2019-05-02
### Fixed
- Correctly parse and print error message in `vtex deps update` and `vtex unlink` commands.

## [2.55.3] - 2019-05-02
### Fixed
- `vtex whoami` shows that the user is not logged in if it fails to read the workspace state.

## [2.55.2] - 2019-05-02
### Fixed
- Do not allow users to create workspace names with hyphens.

## [2.55.1] - 2019-04-30

## [2.55.0] - 2019-04-25
### Fixed
- A/B test finish messages (again).

## [2.54.7] - 2019-04-24
### Changed
- Check if `vtex.ab-tester` is installed before attempting to use A/B testing functionality.

## [2.54.6] - 2019-04-18
### Changed
- Upgrade to @vtex/api to version 3.4.0 or higher.

## [2.54.5] - 2019-04-18
### Changed
- Watcher debouncer wait time from 300ms to 1000ms.

## [2.54.4] - 2019-04-17
### Changed
- Completely remove the `vtex production` command.

## [2.54.3] - 2019-04-17
### Fixed
- A/B Test finish message.

## [2.54.2] - 2019-04-16
### Fixed
- Fix Changelog and add `.git/` to `.npmignore`.

## [2.54.1] - 2019-04-16
### Fixed
- Builder availability requests being cached by updating to `@vtex/api^3.3.1`.

## [2.54.0] - 2019-04-15
### Added
- Implement workspace A/B testing interface.

## [2.53.11] - 2019-04-10
### Fixed
- Undesired logs appearing during `vtex publish`.

## [2.53.10] - 2019-04-08
### Added
- `delivery-theme` repo to the `vtex init` command.

## [2.53.9] - 2019-04-04
### Added
- `service-example` repo to the `vtex init` command.

## [2.53.8] - 2019-04-02
### Fixed
- Start debugger tunnel only for node apps.

## [2.53.7] - 2019-04-01
### Added
- The `vtex release` command accept a valid (semver) version as its first argument.

## [2.53.6] - 2019-03-28
### Added
- `--unsafe` (`-u`) option for the `vtex link` command, which enables apps
  being linked with typescript errors.

## [2.53.5] - 2019-03-28
### Changed
- Replace `enquirer` with `prompt-confirm` for confirmation prompts.

## [2.53.4] - 2019-03-28
### Fixed
- Request vtex.builder-hub's availability for route map warm-up instead of
  querying Colossus, which not every user is allowed to do.

### Added
- Retries for vtex.builder-hub availability requests and debugger connection.

## [2.53.3] - 2019-03-28
### Added
- Workspace information (whether it is in dev or production mode) in the output
  of the `vtex whoami` command.

## [2.53.2] - 2019-03-27
### Fixed
- Stop trying to get manifest of apps with specific majors or minors from
  VTEX Registry, which is forbidden.

## [2.53.1] - 2019-03-27
### Fixed
- Fix relink behaviour for linked node dependencies.

## [2.53.0] - 2019-03-25
### Changed
- Replaced the `inquirer` dependency with `enquirer`.

## [2.52.2] - 2019-03-21
### Fixed
- Added missing dependency `js-yaml`.

## [2.52.1] - 2019-03-21
### Fixed
- Conflicts with the master.

## [2.52.0] - 2019-03-21
### Added
- Allows usage of VTEX IO clusters other than production and staging, by setting
  the environment variable `VTEXIO_REGION`.

## [2.51.4] - 2019-03-21
### Changed
- Remove filtering of unhandled errors before printing to console (when using `--verbose`).

## [2.51.3] - 2019-03-21
### Fixed
- App versions colored diff was not showing prerelease tags.

## [2.51.2] - 2019-03-19
### Added
- Add `render-guide` and `masterdata-graphql-guide` to the `vtex init` command options.

## [2.51.1] - 2019-03-19
### Added
- Makes possible to switch directly to another account/workspace with the `vtex switch {account}/{workspace}` syntax.

## [2.51.0] - 2019-03-19
### Changed
- Remove eslint setup copying when linking.
- Remove eslint-related dependencies from the project.

## [2.49.1] - 2019-03-18
### Fixed
- Forward `production` value to reset command when coming from `use` command.

## [2.49.0] - 2019-03-18
### Changed
- Workspace lifecycle now conforms to Chronos with a workspace being created as dev or production.
- Command `vtex production` is deprecated and it is not possible to change the production flag of a workspace after it is created.
- Links are only allowed in dev workspaces.
- Only production workspaces may be promoted to master.

## [2.48.1] - 2019-03-14
### Fixed
- Answer for switching to previous account after `vtex publish` is now correctly considered.

## [2.48.0] - 2019-03-14
### Changed
- Upgrade @vtex/api to version 2.3.0.

## [2.47.0] - 2019-03-14
### Fixed
- Config is saved before changing account for app publishing and is
  automatically restored when going back to previous account.

## [2.46.0] - 2019-03-14

## [2.45.0] - 2019-03-14
### Added
- Option `--major` (`-m`) in `vtex update` for updating app majors.

## [2.44.0] - 2019-03-14

## [2.43.0] - 2019-03-12

### Added
- Warm up workspace route map on creation.

## [2.42.4] - 2019-03-11
### Added
- `vtex release pre` alias for `vtex release prerelease`.

## [2.42.3] - 2019-03-09
### Added
- Error messages for missing install licenses and unsupported regions.

## [2.42.2] - 2019-03-07

## [2.42.1] - 2019-02-28

## [2.42.0] - 2019-02-28
### Added
- Close Chrome tab after successful login on Mac.

## [2.41.8] - 2019-02-28
### Fixed
- File watcher during `vtex link` should not queue files as 'deleted' when they are simply updated

## [2.41.7] - 2019-02-27
### Fixed
- `vtex release` only updates CHANGELOG.md on stable releases.

## [2.41.6] - 2019-02-27
### Fixed
- Post release scripts run with `vtex release` have output correctly piped to stdio.

## [2.41.5] - 2019-02-27
### Changed
- Make `short` the default and only option for `vtex ls`.
- Adjust colors of vendor name on `vtex ls`.
- Use clean tables on `update`, `infra list`, and `workspace list` commands.

## [2.41.4] - 2019-02-26
### Added
- Add confirmation of account/workspace before uninstalling apps.

## [2.41.3] - 2019-02-25
### Changed
- Use new auth-server routes.

## [2.41.2] - 2019-02-25
### Added
- `--no-watch` option for `vtex link`.


## [2.41.0] - 2018-02-21
### Added
- `vtex release` command analogous to `releasy`.

## [2.38.0] - 2018-02-12
### Added
- Enable running commands inside subdirectories.

## [2.35.0] - 2018-01-17
### Added
- Add `--short` option to `list`.

## [0.19.0] - 2016-05-19
### Changed
- Change stable endpoints to new apps and workspaces model.
- `shelljs` to v0.7.0.
- `update-notifier` to v0.7.0.

### Fixed
- `webpack-dev-server` redirect without port.

## [0.18.0] - 2016-04-19
### Added
- Add `ora` spinner.

### Fixed
- Dev workflow.
- `vtexsay` message.

## [0.17.1] - 2016-04-18
### Fixed
- `update-notifier` missing dependency.

## [0.17.0] - 2016-04-18
### Added
- Add `update-notifier`.

### Changed
- `eslint-plugin-react` to v5.0.1.
- Add the sandbox name on webpack's `publicPath`.

## [0.16.0] - 2016-04-14
### Changed
- From `meta.json` to `manifest.json`.
- `.vtexrc` is now a JSON file.
- `eslint-config-vtex` to v3.0.1.
- `archiver` to v1.0.0.
- `babel-eslint` to v6.0.2.

### Fixed
- `babel-eslint` dependency version.

## [0.15.1] - 2016-03-01
### Fixed
- [Fix unbalanced parentheses](https://github.com/vtex/toolbelt/commit/8eb49411895d1b639f2e4b0e7d7408cfc3714bed)

## [0.15.0] - 2016-03-01
### Changed
- `.vtexrc` instead of using `GalleryEndpoint` now uses `AppsEndpoint` and `WorkspacesEndpoint`.
- shelljs -> 0.6.0.
- glob -> 7.0.0.
- node-libs-browser -> 1.0.0.
- prompt -> 1.0.0.
- eslint -> 2.0.0.
- babel-eslint -> 5.0.0.
- eslint-plugin-react -> 4.1.0.

### Fixed
- [Fix chalk usage](https://github.com/vtex/toolbelt/commit/fb974d345f5480fb5879ce7971c3f6fa3e34d3d2)
- [Use stable gallery endpoints](https://github.com/vtex/toolbelt/commit/abe9b41f04c644e9e5ca3ca6211a01b88b78ee45)

## [0.14.1] - 2016-01-01
### Changed
- Update some deps and fix login error with start token.

## [0.14.0] - 2015-12-21
### Changed
- `node_modules`, `package.json` and `.git` are ignored by default.

## [0.13.2] - 2015-12-14
### Fixed
- Fix undeclared `rl` var on windows.

## [0.13.1] - 2015-12-09
### Changed
- We dumped CoffeeScript in favor of ES6! Since all the code was deleted and written in ES6, you may encounter some issues, if you do, please open an issue.
- Improve error handling.
- Show publish error details.

### Fixed
- Fix grammar in some messages.
- [`#73`](https://github.com/vtex/toolbelt/issues/73)

## [0.13.0] - 2015-11-19
### Changed
It updates the JSON we send to the gallery! Just that :)
- [`#82`](https://github.com/vtex/toolbelt/issues/82)

## [0.12.0] - 2015-11-06
### Added
- Add special auth method for `@vtex.com` or `@vtex.com.br` e-mails.

## [0.11.0] - 2015-11-05
### Changed
- On this update we changed the way we tell Storefront that you're watching a new app!
- Instead of WebSockets, we now use HTTP for keep alive, not as elegant but made a few bugs disappear.

### Added
- We also added a message on `vtex login` to make the prompts less ambiguous. Still on the login, there's now a validation on the `account` prompt! It should be alphanumeric with only dashes `-` as a special character.
- [`#73`](https://github.com/vtex/toolbelt/issues/73)
- [`#72`](https://github.com/vtex/toolbelt/issues/72)

## [0.10.4] - 2015-10-30
### Fixed
Fix location of warnings in sandbox changes.

## [0.10.3] - 2015-10-29
### Fixed
Fix disconnection issue when exiting by Ctrl + C and workspace creation request.
- [`#69`](https://github.com/vtex/toolbelt/issues/69)

## [0.10.2] - 2015-10-28
### Fixed
- Fix login message when using Ctrl + C to exit the prompt and moar error messages.

## [0.10.1] - 2015-10-28
### Fixed
- Fix signalr-client dependency.

## [0.10.0] - 2015-10-27
Hello, fellow developers!

I'm glad to announce that **THE COOKIE IS DEAD!!11!!**

Ok... maybe not that much. Let me explain:

The cookies for the `sandbox` and `workspace` pretty much still exists, **BUT**, we've created a good and ol' barrel of abstraction on top of it so you don't have to worry anymore.

Now we have a convention for setting those cookies. We will create a workspace with the name `sb_<your-vtex-developer-email>` and on that workspace you'll have a sandbox with the name `<your-vtex-developer-email>`. Because of that, you don't need to type the `sandbox` as an argument of `watch` anymore!

You will access those by simply putting a querystring on the link you use for development, for example: `storename.beta.myvtex.com/?workspace=sb_mydeveloperemail@whut.com`.

All we ask in return is that when you log in you inform us the account you wish to be logged (yeah, only one account at a time).

I know you're excited, yeah, gimme a hug homie <3

**TL;DR:** You don't need to type the sandbox name on `watch` or set the cookies anymore.

# !!!

**First big important note:** If you have any credentials cached, please `logout` and `login` again.

**Second big important note:** Delete the previous `vtex_workspace` and `vtex_sandbox` cookies that you have setted before.

# !!!

- [`#58`](https://github.com/vtex/toolbelt/issues/58)
- [`#48`](https://github.com/vtex/toolbelt/issues/48) (closed due to deprecation)

## [0.9.4] - 2015-10-22
### Added
- Update changes log to include warnings from server response.
- [`#60`](https://github.com/vtex/toolbelt/issues/60)

## [0.9.3] - 2015-10-06
### Added
- Now, server sets an environment variable called `HOT` (dayum yeah).
- [`#55`](https://github.com/vtex/toolbelt/issues/55)

## [0.9.2] - 2015-09-28
Hello again, fellas.

Today we have a round of the good ol' fixes.

Users of the `npm@3` version will be glad to know that the dependencies issues were handled. `tiny-lr` got updated and everything is now beautifully working. Also, removed `grunt-coffeelint` for having peer dependencies issues too.

I hope that people get a little less confused when running the toolbelt when he doesn't need to send anything to the sandbox servers. Why? Well, we got a new message just for that case :)

And, for the finale, the toolbelt will warn you properly when the port of the server is occupied. I think that shows good manners, exploding the way it used before doesn't show you have good loving parents!

- [`#43`](https://github.com/vtex/toolbelt/issues/43)
- [`#49`](https://github.com/vtex/toolbelt/issues/49)
- [`#51`](https://github.com/vtex/toolbelt/issues/51)
- [`#53`](https://github.com/vtex/toolbelt/issues/53)

## [0.9.1] - 2015-09-26
Nothing big here, just fixes some issue with the `watch` command when running with no flags.

- [`#50`](https://github.com/vtex/toolbelt/issues/50)

## [0.9.0] - 2015-09-24
Let's kick the dust off and start with the good stuff!

The file `vtex-webpack` is now **gone** (we won't miss you, so k bye). Now we have a new one, shiny and pretty called `webpack` (yep), it lives on the `lib` folder.

The logic behind the `-w` and `-s` options is now there, and the entrypoint for them is now on `vtex-watch`, which makes much more sense since they are options of **watch**.

Last but not least, the VTEX Toolbelt server now uses the new [react-transform](https://github.com/gaearon/react-transform)!

Instead of using `webpack-dev-server	`, we're using an `express` server with `webpack-hot-middleware` and `webpack-dev-middleware`. Note that `webpack-dev-middleware` doesn't write anything on disk and handles everything in memory, so don't freak out if you see your `assets` folder sitting there all alone.

This assumes some pre-configuration on the project to work properly (see [Hot Module Replacement](https://github.com/vtex/toolbelt#hot-module-replacement) section on README). Besides, it's a world of new possibilities and probably makes it easier to make the dreamy multiple app hot reload that we all want!

On this release two main issues are fulfilled (actually, one is partially done):

- [`#44`](https://github.com/vtex/toolbelt/issues/44) (this is the partially one)
- [`#35`](https://github.com/vtex/toolbelt/issues/35)
