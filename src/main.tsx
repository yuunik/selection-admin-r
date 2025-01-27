import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'virtual:svg-icons-register'

// import App from '@/App.tsx'
import router from '@/router'

import '@/styles/index.scss'
// import '@/index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
