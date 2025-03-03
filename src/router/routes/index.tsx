import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import {
  CrownOutlined,
  DeploymentUnitOutlined,
  FundProjectionScreenOutlined,
  HomeOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  LockOutlined,
  ShopOutlined,
  TrademarkOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons'

import type { RouteType } from '@/types'
import AuthRoute from '@/components/AuthRoute'

// 一级路由
const Layout = lazy(() => import('@/layout'))
const Login = lazy(() => import('@/pages/login'))
const NotFound = lazy(() => import('@/pages/404'))
const User = lazy(() => import('@/pages/acl/user'))
const Role = lazy(() => import('@/pages/acl/role'))
const Permission = lazy(() => import('@/pages/acl/permission'))
const Trademark = lazy(() => import('@/pages/prod/trademark'))
const Attr = lazy(() => import('@/pages/prod/attr'))
const Sku = lazy(() => import('@/pages/prod/sku'))
const Spu = lazy(() => import('@/pages/prod/spu'))
const Screen = lazy(() => import('@/pages/screen'))

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
        element: <AuthRoute component={HomePage} />,
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
    path: '/screen',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthRoute component={Screen} />
      </Suspense>
    ),
    name: 'screen',
    meta: {
      title: '数据大屏',
      isShow: true,
      icon: <FundProjectionScreenOutlined />,
    },
  },
  {
    path: '/acl',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    ),
    name: 'acl',
    children: [
      {
        path: '/acl/user',
        element: <AuthRoute component={User} />,
        name: 'user',
        meta: {
          title: '用户管理',
          isShow: true,
          icon: <UserOutlined />,
        },
      },
      {
        path: '/acl/role',
        element: <AuthRoute component={Role} />,
        name: 'role',
        meta: {
          title: '角色管理',
          isShow: true,
          icon: <IdcardOutlined />,
        },
      },
      {
        path: '/acl/permission',
        element: <AuthRoute component={Permission} />,
        name: 'permission',
        meta: {
          title: '权限管理',
          isShow: true,
          icon: <UnorderedListOutlined />,
        },
      },
    ],
    meta: {
      title: '权限管理',
      isShow: true,
      icon: <LockOutlined />,
    },
  },
  {
    path: '/prod',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    ),
    name: 'prod',
    children: [
      {
        path: '/prod/trademark',
        element: <AuthRoute component={Trademark} />,
        name: 'trademark',
        meta: {
          title: '品牌管理',
          isShow: true,
          icon: <TrademarkOutlined />,
        },
      },
      {
        path: '/prod/attr',
        element: <AuthRoute component={Attr} />,
        name: 'attr',
        meta: {
          title: '属性管理',
          isShow: true,
          icon: <InfoCircleOutlined />,
        },
      },
      {
        path: '/prod/sku',
        element: <AuthRoute component={Sku} />,
        name: 'sku',
        meta: {
          title: 'SKU管理',
          isShow: true,
          icon: <CrownOutlined />,
        },
      },
      {
        path: '/prod/spu',
        element: <AuthRoute component={Spu} />,
        name: 'spu',
        meta: {
          title: 'SPU管理',
          isShow: true,
          icon: <DeploymentUnitOutlined />,
        },
      },
    ],
    meta: {
      title: '商品管理',
      isShow: true,
      icon: <ShopOutlined />,
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
