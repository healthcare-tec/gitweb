import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/lib': path.resolve(__dirname, './lib'), // Alias para o diretório lib na raiz
      '@': path.resolve(__dirname, './src'), // Alias para o diretório src
    },
  },
})

