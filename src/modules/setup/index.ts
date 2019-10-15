import { getManifest } from '../../manifest'
import { setupESLint } from './setupESLint'
import { setupTSConfig } from './setupTSConfig'
import { setupTypings } from './setupTypings'

const buildersToAddAdditionalPackages = ['react', 'node']
const buildersToAddTypes = ['react', 'node']

export default async (opts: { i?: boolean; 'ignore-linked': boolean }) => {
  const ignoreLinked = opts.i || opts['ignore-linked']
  const manifest = await getManifest()
  setupESLint(manifest, buildersToAddAdditionalPackages)
  await setupTSConfig(manifest)
  await setupTypings(manifest, ignoreLinked, buildersToAddTypes)
}
