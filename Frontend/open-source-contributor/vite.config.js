import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    port:5000
  },
  plugins: [react()],
  build: {
    outDir: 'build'  // Change this to 'build' if you prefer
  }
})
