import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@lib": fileURLToPath(new URL('./library', import.meta.url) ),
      "@api": fileURLToPath(new URL('./src/api', import.meta.url) ),
      "@stores": fileURLToPath(new URL('./src/stores', import.meta.url)),
      "@assets": fileURLToPath(new URL('./src/assets', import.meta.url)),
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./library/style/global.less";',
      },
    },
  },
})
