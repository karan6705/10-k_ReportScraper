// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ↙️ for `npm run dev`
  server: {
    host: true,             // listen on 0.0.0.0
    port: 5173,             // or whatever your dev port is
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
    // allow your Render preview hostname when doing `npm run dev` remotely
    allowedHosts: [
      'one0-k-reportscraper-2.onrender.com'
    ],
  },

  // ↙️ for `npm run preview`
  preview: {
    host: '0.0.0.0',
    port: 10000,            // match Render’s container port
    strictPort: true,
    // allow the preview host
    allowedHosts: [
      'one0-k-reportscraper-2.onrender.com'
    ],
  },
})
