import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer()],
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
