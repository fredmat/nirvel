import shopify from 'vite-plugin-shopify'
import cleanViteShopifyAssets from './scripts/cleanViteShopifyAssets.js'
import loadViteEnv from './scripts/loadViteEnv.js'

const ENV = loadViteEnv()

export default {
  build: {
    emptyOutDir: false,
    minify: process.env.THEME_ENV === 'production',
  },
  // server: {
  //   cors: {
  //     origin: [
  //       /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
  //       'https://127.0.0.1:9292',
  //       'http://127.0.0.1:9292',
  //       'https://lumalumen.myshopify.com/',
  //       'https://lumalumen.myshopify.com',
  //     ]
  //   }
  // },
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
