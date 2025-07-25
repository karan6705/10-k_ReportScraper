// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Remove the proxy section completely
  },
  preview: {
    host: '0.0.0.0',
    port: 10000,
    strictPort: true,
    allowedHosts: [
      'one0-k-reportscraper-2.onrender.com'
    ],
  },
})
