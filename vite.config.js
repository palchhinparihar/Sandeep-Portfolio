import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) {
              return 'router';
            }

            if (id.includes('framer-motion')) {
              return 'motion';
            }

            if (id.includes('react-toastify')) {
              return 'toastify';
            }

            if (id.includes('react-icons')) {
              return 'icons';
            }

            if (id.includes('aos')) {
              return 'aos';
            }

            if (id.includes('ogl')) {
              return 'ogl';
            }

            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
})
