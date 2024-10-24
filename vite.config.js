import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa'; // Import the PWA plugin

export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    VitePWA({ // Add PWA configuration here
      registerType: 'autoUpdate', // Auto updates the service worker
      manifest: {
        name: 'My Awesome App',
        short_name: 'AwesomeApp',
        description: 'An awesome app made with Vite, React, and Firebase',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // All node_modules will go into the vendor chunk
          }
          if (id.includes('src/components')) {
            return 'components'; // Group all components together
          }
          if (id.includes('src/services')) {
            return 'services'; // Group all services together
          }
          if (id.includes('src/utils')) {
            return 'utils'; // Group all utility functions together
          }
          // Further conditions to create smaller chunks can be added here.
        },
      },
      chunkSizeWarningLimit: 600, // Adjust this if needed
    },
  },
});
