import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'

import AuthRoute from '@/components/AuthRoute'

const Layout = lazy(() => import('@/layout'))
const Login = lazy(() => import('@/pages/login'))
const NotFound = lazy(() => import('@/pages/404'))

const constantRoutes = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
    name: 'login',
  },
  {
    path: '/home',
    element: (
      <AuthRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout />
        </Suspense>
      </AuthRoute>
    ),
    name: 'layout',
  },
  {
    path: '/404',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
    name: '404',
  },
  {
    // 匹配任意路径, 重定向到 404 页面
    path: '/:pathMatch/*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Navigate to="/404" replace />
      </Suspense>
    ),
    name: 'any',
  },
]

export { constantRoutes }
