import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Domaine custom Hostinger → toujours servi depuis la racine
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',  // Dossier de build
    assetsDir: 'assets',  // Dossier pour les assets dans /dist
  },
})
