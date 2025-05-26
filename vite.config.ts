import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
    build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'pages/about/index.html'),
        asignar: path.resolve(__dirname, 'pages/asignar/index.html'),
        biblioteca: path.resolve(__dirname, 'pages/biblioteca/index.html'),
        consultar: path.resolve(__dirname, 'pages/consultar/index.html'),
        consultar_libros: path.resolve(__dirname, 'pages/consultar_libros/index.html'),
        prestamo: path.resolve(__dirname, 'pages/prestamo/index.html'),
        register: path.resolve(__dirname, 'pages/register/index.html'),
      }
    }
  }
})