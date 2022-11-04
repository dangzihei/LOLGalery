import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite'
import { resolve } from 'path'

export default ({ mode }) => {
  return defineConfig({
    base: loadEnv(mode, process.cwd()).VITE_BASE_URL,
    plugins: [vue()],
    resolve: {
      // 配置别名
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  })
}
