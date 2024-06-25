import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        "name": "Elderly Care",
        "short_name": "ElderlyCare",
        "start_url": "./",
        "display": "standalone",
        "background_color": "#fff",
        "description": "Elder Care App to connect Doctors with Elders.",
        "theme_color": "#ffffff",
        "icons": [
          {
            "src": "logo.png",
            "sizes": "168x168",
            "type": "image/png"
          },
          {
            "src": "logo.png",
            "sizes": "192x192",
            "type": "image/png"
          }
        ]
      }
    })
  ]
})
