import { existsSync } from 'node:fs'
import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

async function main() {
  if (existsSync(path.join(process.cwd(), 'preview.png'))) {
    await copyFile(
      path.join(process.cwd(), 'preview.png'),
      path.join(process.cwd(), 'dist', 'preview.png'),
    )
  }

  await copyFile(
    path.join(process.cwd(), 'manifest.json'),
    path.join(process.cwd(), 'dist', 'manifest.json'),
  )
}

main()
