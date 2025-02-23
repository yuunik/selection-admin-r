import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'virtual:svg-icons-register'

import App from '@/App.tsx'

import '@/styles/index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
