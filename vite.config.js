const { resolve } = require('path')
const { defineConfig } = require('vite')

export default defineConfig({
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