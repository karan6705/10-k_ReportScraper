// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    host: true,             // Listen on 0.0.0.0
    port: 5173,             // Development port
    strictPort: true,
    // Removed proxy configuration to force direct backend calls
    allowedHosts: [
      'one0-k-reportscraper-2.onrender.com'
    ],
  },
  
  // Production preview configuration
  preview: {
    host: '0.0.0.0',
    port: 10000,            // Match Render's container port
    strictPort: true,
    allowedHosts: [
      'one0-k-reportscraper-2.onrender.com'
    ],
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  }
})
