import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

async function main() {
  const [sourceArg, destinationArg, ...extraArgs] = process.argv.slice(2)
  if (extraArgs.length > 0 || Boolean(sourceArg) !== Boolean(destinationArg)) {
    throw new Error('Usage: post-build [extra-source extra-destination]')
  }

  const cwd = process.cwd()
  const distPath = path.join(cwd, 'dist')
  const manifestPath = path.join(cwd, 'manifest.json')

  await fs.mkdir(distPath, { recursive: true })

  if (existsSync(path.join(cwd, 'preview.png'))) {
    await fs.copyFile(path.join(cwd, 'preview.png'), path.join(distPath, 'preview.png'))
  }

  await fs.copyFile(manifestPath, path.join(distPath, 'manifest.json'))

  if (sourceArg && destinationArg) {
    await copyExtraFile(cwd, sourceArg, destinationArg)
  }
}

async function copyExtraFile(cwd: string, sourceArg: string, destinationArg: string) {
  const sourcePath = path.resolve(cwd, sourceArg)
  const destinationPath = path.resolve(cwd, destinationArg)
  await fs.mkdir(path.dirname(destinationPath), { recursive: true })
  await fs.copyFile(sourcePath, destinationPath)
}

main()
