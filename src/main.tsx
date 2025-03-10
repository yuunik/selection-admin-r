import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'virtual:svg-icons-register'
import zhCN from 'antd/locale/zh_CN'
// for date-picker i18n
import 'dayjs/locale/zh-cn'
import { ConfigProvider } from 'antd'

import App from '@/App.tsx'

import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
