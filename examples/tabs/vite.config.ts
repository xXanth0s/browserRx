import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.ts'),
        background: resolve(__dirname, 'background.ts')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  publicDir: false,  // Disable default public directory handling
  plugins: [
    {
      name: 'copy-static-files',
      generateBundle() {
        // Copy manifest.json
        this.emitFile({
          type: 'asset',
          fileName: 'manifest.json',
          source: readFileSync(resolve(__dirname, 'manifest.json'))
        });
        
        // Copy popup.html
        this.emitFile({
          type: 'asset',
          fileName: 'popup.html',
          source: readFileSync(resolve(__dirname, 'popup.html'))
        });
      }
    }
  ]
}); 