import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig( {
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://university-dashboard-system.onrender.com',
        // target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    }
  }
} )
