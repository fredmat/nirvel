import fs from 'node:fs/promises'
import path from 'node:path'

export default function cleanViteShopifyAssets() {
  let outDir = null
  let oldManifest = null
  const manifestRelPath = '.vite/manifest.json'

  return {
    name: 'clean-vite-shopify-assets',
    apply: 'build',

    configResolved(config) {
      outDir = config.build.outDir
    },

    async buildStart() {
      if (!outDir) return

      const manifestPath = path.resolve(outDir, manifestRelPath)

      try {
        const content = await fs.readFile(manifestPath, 'utf8')
        oldManifest = JSON.parse(content)
        console.log('📦 Old manifest loaded')
      } catch {
        oldManifest = null
      }
    },

    async closeBundle() {
      if (!outDir) return
      if (!oldManifest) return

      const manifestPath = path.resolve(outDir, manifestRelPath)

      let newManifest
      try {
        const content = await fs.readFile(manifestPath, 'utf8')
        newManifest = JSON.parse(content)
      } catch {
        return
      }

      const extractFiles = (manifest) =>
        Object.values(manifest)
          .flatMap((entry) => [
            entry.file,
            ...(entry.css || []),
            ...(entry.assets || []),
          ])
          .filter(Boolean)

      const oldFiles = new Set(extractFiles(oldManifest))
      const newFiles = new Set(extractFiles(newManifest))

      const toDelete = [...oldFiles].filter((f) => !newFiles.has(f))

      for (const file of toDelete) {
        const full = path.resolve(outDir, file)
        try {
          await fs.unlink(full)
          console.log(`🧹 Deleted old asset: ${file}`)
        } catch (err) {
          if (err.code !== 'ENOENT') {
            console.warn(
              `[clean-vite-shopify-assets] Failed to delete ${file}: ${err.message}`,
            )
          }
        }
      }
    },
  }
}
