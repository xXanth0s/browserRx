import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'browserRx',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['rxjs', 'webextension-polyfill'],
      output: {
        globals: {
          rxjs: 'rxjs',
          'webextension-polyfill': 'browser'
        },
      },
    },
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['**/*.spec.ts', '**/*.test.ts'],
    }),
  ],
}); 