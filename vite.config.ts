import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glslify from 'vite-plugin-glslify'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),

  ],

  optimizeDeps: {
    include: ['slick-carousel', 'typed.js'],
    exclude: ['jquery']
  }
})