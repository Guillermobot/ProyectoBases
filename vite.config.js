import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/', // Asegura que las rutas base sean correctas
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Permite importar desde la carpeta src usando @
    },
  },
  publicDir: 'public', // Asegura que los archivos estáticos se sirvan correctamente
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    port: 5173,
    host: true, // Permite acceder desde otros dispositivos en la red local
    strictPort: true,
  },
})