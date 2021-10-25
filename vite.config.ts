import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import path from 'path'

const pathResolve = (dir) => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      // @/xxxx => src/xxxx
      {
        find: '@',
        replacement: pathResolve('src'),
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types'),
      },
    ],
  },
  base: './', // 设置打包路径
  server: {
    host: true,
    port: 4396, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  }
})
