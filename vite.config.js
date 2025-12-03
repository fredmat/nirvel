import shopify from 'vite-plugin-shopify'
import cleanViteShopifyAssets from './scripts/cleanViteShopifyAssets.js'
import loadViteEnv from './scripts/loadViteEnv.js'

const ENV = loadViteEnv()

export default {
  build: {
    emptyOutDir: false,
    minify: process.env.THEME_ENV === 'production',
  },
  plugins: [
    cleanViteShopifyAssets(),
    shopify({
      snippetFile: ENV.VITE_SNIPPET_FILE,
      themeRoot: ENV.VITE_THEME_ROOT,
      entrypointsDir: ENV.VITE_ENTRYPOINTS_DIR,
      additionalEntrypoints: ENV.VITE_ADDITIONAL_ENTRYPOINTS,
      hotReload: ENV.VITE_THEME_HOT_RELOAD,
      versionNumbers: ENV.VITE_VERSION_NUMBERS,
    }),
  ]
}
