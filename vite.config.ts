import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import mkcert from 'vite-plugin-mkcert';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, './src/pages');

  return {
    base: './',
    root: resolve(__dirname, 'src/pages'),
    publicDir: resolve(__dirname, 'public'),
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/pages/index.html'),
          iframe: resolve(__dirname, 'src/pages/iframe.html'),
        },
        output: { manualChunks: undefined },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          globalVars: {},
        },
      },
    },
    plugins: [react(), cssInjectedByJsPlugin(), createHtmlPlugin({ minify: true }), mkcert()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      open: true,
      port: 5173,
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  };
});
