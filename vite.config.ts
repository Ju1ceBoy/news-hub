import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/nyt-api': {
        target: 'https://api.nytimes.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nyt-api/, ''),
        headers: {
          'Accept': 'application/json',
        }
      }
    }
  }
})
