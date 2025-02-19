/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/*.spec.ts'],
    globals: true,
    testTimeout: 1000,
    hookTimeout: 1000,
    alias: {
      'webextension-polyfill': resolve(__dirname, 'src/__mocks__/webextension-polyfill.ts')
    }
  }
}); 