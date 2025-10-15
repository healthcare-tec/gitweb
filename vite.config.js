import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use caminho relativo para o GitHub Pages
  resolve: {
    alias: {
      '@/lib': path.resolve(__dirname, './src/lib'), // Alias para o diretório lib dentro de src
      '@': path.resolve(__dirname, './src'), // Alias para o diretório src
    },
  },
})
