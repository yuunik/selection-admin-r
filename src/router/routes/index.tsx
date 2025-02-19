import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteType } from '@/types/index.d.tsx'
import { HomeOutlined } from '@ant-design/icons'

const Layout = lazy(() => import('@/layout'))
const Login = lazy(() => import('@/pages/login'))
const NotFound = lazy(() => import('@/pages/404'))

// 二级路由
const HomePage = lazy(() => import('@/pages/home'))

// 常量路由
const constantRoutes: RouteType[] = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
    name: 'login',
    meta: {
      // 页面标题
      title: '登录页',
      isShow: false,
    },
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    ),
    name: 'layout',
    children: [
      {
        path: '/home',
        element: <HomePage />,
        name: 'homepage',
        meta: {
          title: '首页',
          isShow: true,
          icon: <HomeOutlined />,
        },
      },
    ],
    meta: {
      title: '布局页',
      isShow: false,
    },
  },
  {
    path: '/404',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
    name: '404',
    meta: {
      title: '错误页',
      isShow: false,
    },
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
    meta: {
      title: '任意页',
      isShow: false,
    },
  },
]

export default constantRoutes
