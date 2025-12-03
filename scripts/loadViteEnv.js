import dotenv from 'dotenv'
import { viteEnvDefaults } from './viteEnvDefaults.js'

dotenv.config()

export default function loadViteEnv() {
  const env = {}

  for (const key of Object.keys(viteEnvDefaults)) {
    let raw = process.env[key]

    if (raw === undefined || raw === '') {
      // use default
      env[key] = viteEnvDefaults[key]
      continue
    }

    // Convert booleans "true" / "false"
    if (raw === 'true') {
      env[key] = true
      continue
    }
    if (raw === 'false') {
      env[key] = false
      continue
    }

    // Convert arrays like: ["a","b","c"] OR a,b,c
    if (Array.isArray(viteEnvDefaults[key])) {
      try {
        if (raw.trim().startsWith('[')) {
          // JSON array
          env[key] = JSON.parse(raw)
        } else {
          // comma-separated
          env[key] = raw.split(',').map(s => s.trim())
        }
      } catch {
        console.warn(`Invalid array format for ${key}, using default`)
        env[key] = viteEnvDefaults[key]
      }
      continue
    }

    // Fallback : string
    env[key] = raw
  }

  return env
}
