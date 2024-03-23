import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port : 3000,
    proxy : {
      '/api' : {
        target : 'https://todos-server-3uw2yjr4t-afaq-ahmads-projects-571f8223.vercel.app/',
        // changeOrigin : true
      }
    }
  }
})
