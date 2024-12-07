import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'

interface Manifest {
  slug?: string
}

;(async () => {
  const manifest: Manifest = JSON.parse(await fs.readFile('manifest.json', 'utf-8'))
  if (!manifest.slug) {
    throw new Error('Manifest is missing a slug')
  }

  const betterNcmDataPath = process.env.BETTERNCM_PROFILE || 'C:\\betterncm'

  const pluginPath = path.join(betterNcmDataPath, 'plugins_dev', manifest.slug)
  if (!existsSync(pluginPath)) {
    await fs.mkdir(pluginPath, { recursive: true })
  }

  for (const file of await fs.readdir('dist')) {
    await fs
      .copyFile(path.join('dist', file), path.join(pluginPath, file))
      .catch(console.error)
  }
})()
