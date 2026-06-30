/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['ds/favicon.svg', 'ds/logo-symbol.svg'],
      manifest: {
        name: 'Stack Learning',
        short_name: 'Stack',
        description: 'Aprenda o Stack Sketchain e Engenharia de IA',
        theme_color: '#0F0F0F',
        background_color: '#0F0F0F',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'logo-symbol-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'logo-symbol-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'supabase-api', networkTimeoutSeconds: 10 },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
