import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/golden/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon-fast.png', 'icon-192-transparent-fast.png', 'icon-512-transparent-fast.png'],
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      manifest: {
        name: 'العصر الذهبي',
        short_name: 'العصر الذهبي',
        description: 'تطبيق العصر الذهبي - Golden Group',
        theme_color: '#0a0f1d',
        background_color: '#0a0f1d',
        display: 'standalone',
        orientation: 'portrait',
        dir: 'rtl',
        lang: 'ar',
        icons: [
          {
            src: 'icon-192-transparent-fast.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512-transparent-fast.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
