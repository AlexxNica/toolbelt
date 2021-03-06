import { manifestSamples } from '../../fixtures/manifests'
import { mockAppsUtils, mockCreateClients, mockConf, mockEnv, mockRunYarn, mockSetupUtils } from './mocks'

mockConf()
mockEnv()
mockRunYarn()
const { setAppsAvailableAppIDs, setRegistryAvailableAppIDs, resolveAppId, appIdFromRegistry } = mockAppsUtils()
const { setBuilderHubTypings } = mockCreateClients()
const { setPackageJsonByBuilder, packageJsonEditorMock, setTarGzEmptyResponse } = mockSetupUtils()

const { runYarn } = jest.requireMock('../../../modules/utils')
const { setupTypings } = require('../../../modules/setup/setupTypings')

beforeEach(() => {
  jest.clearAllMocks()
  runYarn.mockReturnValue(undefined)
})

describe('React type dependencies are correctly inserted', () => {
  setBuilderHubTypings({
    react: { '3.x': { injectedDependencies: { 'vtex.render-runtime': '8.x' } } },
  })

  test(`If new types doesn't exist, generated package.json has BuilderHub injected typings, app deps typings and old dev deps`, async () => {
    setAppsAvailableAppIDs({
      'vtex.admin': { '1.x': 'vtex.admin@1.18.0' },
      'vtex.render-runtime': { '8.x': 'vtex.render-runtime@8.1.0' },
    })

    setPackageJsonByBuilder({
      react: { name: 'mock', devDependencies: { someApp: '^1.0.0' } },
    })

    setTarGzEmptyResponse(true)

    await setupTypings(manifestSamples['node4-react3-app'], false, ['react'])

    expect(packageJsonEditorMock.read).toBeCalledTimes(1)
    expect(packageJsonEditorMock.read).toBeCalledWith('react')
    expect(packageJsonEditorMock.write).toBeCalledTimes(1)
    expect(packageJsonEditorMock.write).toBeCalledWith('react', {
      name: 'mock',
      devDependencies: {
        someApp: '^1.0.0',
        'vtex.admin': 'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.admin@1.18.0/public/_types/react',
        'vtex.render-runtime':
          'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.render-runtime@8.1.0/public/_types/react',
      },
    })
    expect(runYarn).toBeCalledTimes(1)
  })

  test('If new types exists, generated package.json has BuilderHub injected typings, app deps typings and old dev deps', async () => {
    setAppsAvailableAppIDs({
      'vtex.admin': { '1.x': 'vtex.admin@1.18.0' },
      'vtex.render-runtime': { '8.x': 'vtex.render-runtime@8.1.0' },
    })

    setPackageJsonByBuilder({
      react: { name: 'mock', devDependencies: { someApp: '^1.0.0' } },
    })

    setTarGzEmptyResponse(false)

    await setupTypings(manifestSamples['node4-react3-app'], false, ['react'])

    expect(packageJsonEditorMock.read).toBeCalledTimes(1)
    expect(packageJsonEditorMock.read).toBeCalledWith('react')
    expect(packageJsonEditorMock.write).toBeCalledTimes(1)
    expect(packageJsonEditorMock.write).toBeCalledWith('react', {
      name: 'mock',
      devDependencies: {
        someApp: '^1.0.0',
        'vtex.admin': 'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.admin@1.18.0/public/@types/vtex.admin',
        'vtex.render-runtime':
          'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.render-runtime@8.1.0/public/@types/vtex.render-runtime',
      },
    })
    expect(runYarn).toBeCalledTimes(1)
  })

  test(`If an app is linked and new types doesn't exist the dependency url is different`, async () => {
    setAppsAvailableAppIDs({
      'vtex.admin': { '1.x': 'vtex.admin@1.18.0+build123' },
      'vtex.render-runtime': { '8.x': 'vtex.render-runtime@8.1.0' },
    })

    setPackageJsonByBuilder({
      react: { name: 'mock', devDependencies: { someApp: '^1.0.0' } },
    })

    setTarGzEmptyResponse(true)

    await setupTypings(manifestSamples['node4-react3-app'], false, ['react'])

    expect(packageJsonEditorMock.read).toBeCalledTimes(1)
    expect(packageJsonEditorMock.read).toBeCalledWith('react')
    expect(packageJsonEditorMock.write).toBeCalledTimes(1)
    expect(packageJsonEditorMock.write).toBeCalledWith('react', {
      name: 'mock',
      devDependencies: {
        someApp: '^1.0.0',
        'vtex.admin':
          'https://current-workspace--logged-account.public-endpoint/_v/private/typings/linked/v1/vtex.admin@1.18.0+build123/public/_types/react',
        'vtex.render-runtime':
          'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.render-runtime@8.1.0/public/_types/react',
      },
    })
    expect(runYarn).toBeCalledTimes(1)
  })

  test(`If an app is linked and new types exist the dependency url is different`, async () => {
    setAppsAvailableAppIDs({
      'vtex.admin': { '1.x': 'vtex.admin@1.18.0+build123' },
      'vtex.render-runtime': { '8.x': 'vtex.render-runtime@8.1.0' },
    })

    setPackageJsonByBuilder({
      react: { name: 'mock', devDependencies: { someApp: '^1.0.0' } },
    })

    setTarGzEmptyResponse(false)

    await setupTypings(manifestSamples['node4-react3-app'], false, ['react'])

    expect(packageJsonEditorMock.read).toBeCalledTimes(1)
    expect(packageJsonEditorMock.read).toBeCalledWith('react')
    expect(packageJsonEditorMock.write).toBeCalledTimes(1)
    expect(packageJsonEditorMock.write).toBeCalledWith('react', {
      name: 'mock',
      devDependencies: {
        someApp: '^1.0.0',
        'vtex.admin':
          'https://current-workspace--logged-account.public-endpoint/_v/private/typings/linked/v1/vtex.admin@1.18.0+build123/public/@types/vtex.admin',
        'vtex.render-runtime':
          'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.render-runtime@8.1.0/public/@types/vtex.render-runtime',
      },
    })
    expect(runYarn).toBeCalledTimes(1)
  })

  test(`If an app is linked, new types exist, but --ignore-linked flag is set then the urls are only from vteximg`, async () => {
    setAppsAvailableAppIDs({
      'vtex.admin': { '1.x': 'vtex.admin@1.18.0+build123' },
      'vtex.render-runtime': { '8.x': 'vtex.render-runtime@8.1.0' },
    })

    setRegistryAvailableAppIDs({
      'vtex.admin': { '1.x': 'vtex.admin@1.15.0' },
      'vtex.render-runtime': { '8.x': 'vtex.render-runtime@8.1.0' },
    })

    setPackageJsonByBuilder({
      react: { name: 'mock', devDependencies: { someApp: '^1.0.0' } },
    })

    setTarGzEmptyResponse(false)

    await setupTypings(manifestSamples['node4-react3-app'], true, ['react'])
    expect(appIdFromRegistry).toBeCalled()
    expect(resolveAppId).not.toBeCalled()

    expect(packageJsonEditorMock.read).toBeCalledTimes(1)
    expect(packageJsonEditorMock.read).toBeCalledWith('react')
    expect(packageJsonEditorMock.write).toBeCalledTimes(1)
    expect(packageJsonEditorMock.write).toBeCalledWith('react', {
      name: 'mock',
      devDependencies: {
        someApp: '^1.0.0',
        'vtex.admin': 'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.admin@1.15.0/public/@types/vtex.admin',
        'vtex.render-runtime':
          'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.render-runtime@8.1.0/public/@types/vtex.render-runtime',
      },
    })
    expect(runYarn).toBeCalledTimes(1)
  })
})

test('If yarn fails, package.json is reset to its initial state', async () => {
  runYarn.mockImplementation(() => {
    throw new Error('MOCK-ERR')
  })

  setAppsAvailableAppIDs({
    'vtex.admin': { '1.x': 'vtex.admin@1.18.0' },
    'vtex.render-runtime': { '8.x': 'vtex.render-runtime@8.1.0' },
  })

  setPackageJsonByBuilder({
    react: { name: 'mock', devDependencies: { someApp: '^1.0.0' } },
  })

  await setupTypings(manifestSamples['node4-react3-app'], false, ['react'])
  expect(packageJsonEditorMock.write).toBeCalledTimes(2)
  expect(packageJsonEditorMock.write).toHaveBeenLastCalledWith('react', {
    name: 'mock',
    devDependencies: { someApp: '^1.0.0' },
  })
})

test(`If package.json doesn't exist do nothing`, async () => {
  packageJsonEditorMock.read.mockImplementation(() => {
    const err: any = new Error('MOCK_ERR')
    err.code = 'ENOENT'
    throw err
  })

  await setupTypings(manifestSamples['node4-react3-app'], false, ['react'])
  expect(packageJsonEditorMock.write).not.toBeCalled()
})
