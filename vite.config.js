const { resolve } = require('path')
const { defineConfig } = require('vite')
import mdPlugin, { Mode } from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [mdPlugin({ mode: Mode.HTML })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        partner: resolve(__dirname, 'partner.html'),
        utvecklare: resolve(__dirname, 'utvecklare.html'),
        faq: resolve(__dirname, 'faq.html'),
      }
    },
    sourcemap: true
  }
})