import fs from 'node:fs/promises'
import path from 'node:path'

export default function moveViteManifestToRoot() {
  return {
    name: 'move-and-clean-vite-manifest',
    apply: 'build',

    async closeBundle() {
      const rootDir = process.cwd()
      const themeAssetsDir = 'build/assets'

      const sourceDir = path.resolve(rootDir, themeAssetsDir, '.vite')
      const sourceFile = path.resolve(sourceDir, 'manifest.json')

      const targetDir = path.resolve(rootDir, '.vite')
      const targetFile = path.resolve(targetDir, 'manifest.json')

      try {
        // 1. Créer .vite à la racine si absent
        await fs.mkdir(targetDir, { recursive: true })

        // 2. Copier le manifest
        await fs.copyFile(sourceFile, targetFile)
        console.log('✅ Manifest copié vers .vite/manifest.json (racine)')

        // 3. Supprimer complètement assets/.vite
        await fs.rm(sourceDir, { recursive: true, force: true })
        console.log('🧹 Dossier assets/.vite supprimé du thème')
      } catch (err) {
        console.warn(
          '[move-and-clean-vite-manifest] Manifest ou dossier introuvable:',
          sourceFile
        )
      }
    },
  }
}
