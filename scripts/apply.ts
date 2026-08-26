import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

interface Manifest {
  slug?: string
}

async function main() {
  const manifest: Manifest = JSON.parse(await fs.readFile('manifest.json', 'utf-8'))
  if (!manifest.slug) {
    throw new Error('Manifest is missing a slug')
  }

  const betterNcmDataPath = process.env.BETTERNCM_PROFILE || 'C:\\betterncm'

  const pluginPath = path.join(betterNcmDataPath, 'plugins_dev', manifest.slug)
  if (!existsSync(pluginPath)) {
    await fs.mkdir(pluginPath, { recursive: true })
  }

  await Promise.all(
    (await fs.readdir('dist')).map((file) =>
      fs.copyFile(path.join('dist', file), path.join(pluginPath, file)),
    ),
  )

  console.log(`Plugin ${manifest.slug} applied to BetterNCM`)
}

main()
