import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env file
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    // 样式配置
    css: {
      preprocessorOptions: {
        scss: {
          // javascriptEnabled: true,
          additionalData: '@use "@/styles/variable.scss" as *;',
        },
      },
    },
    // 服务器跨域代理
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_APP_SERVER_URL,
          // 是否允许跨域
          changeOrigin: true,
          // 重写路径
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
  }
})
