import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { message } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'
import { fetchUserInfo } from '@/store/modules/user'
import { saveMenuRoutes } from '@/store/modules/user'
import constantRoutes from '@/router/routes'

/**
 * 路由鉴权组件所接收的参数类型
 */
interface AuthRouteProp {
  component: React.ReactNode
}

// 关闭进度圈
NProgress.configure({ showSpinner: false })

/**
 * 路由鉴权组件
 * @param component
 * @constructor
 */
const AuthRoute: React.FC<AuthRouteProp> = ({ component }) => {
  // 获取 token, 用户信息
  const { token, userInfo } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.userReducer,
  )
  // 获取当前路径
  const location = useLocation()
  // 获取 dispatch
  const dispatch = useDispatch<typeof store.dispatch>()

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      // 无用户信息, 则获取用户信息
      await dispatch(fetchUserInfo())
    } catch (error) {
      message.error((error as Error).message)
      // 跳转登录页面
      return <Navigate to={`/login?redirect=${location.pathname}`} replace />
    }
  }

  // 开始加载进度条
  NProgress.start()
  // 路由鉴权
  if (token) {
    if (location.pathname === '/login') {
      // 提示
      message.info('您已登录, 正在跳转首页')
      // 已登录, 则无法访问登录页面
      return <Navigate to="/" replace />
    } else {
      // 判断是否有用户信息
      if (userInfo) {
        // 有用户信息, 放行
        return <>{component}</>
      } else {
        // 无用户信息, 则获取用户信息, 获取失败则说明 token 失效, 跳转登录页面
        getUserInfo()
      }
    }
  } else {
    // 未登录，跳转登录页面
    if (location.pathname === '/login') {
      // 放行
      return <>{component}</>
    } else {
      // 未登录提示
      message.warning('请先登录')
      // 访问非登录页
      return <Navigate to={`/login?redirect=${location.pathname}`} replace />
    }
  }

  useEffect(() => {
    // 路由鉴权完成后, 结束进度条
    NProgress.done()
    // 获取用户权限菜单
    dispatch(saveMenuRoutes(constantRoutes))
  }, [])
}

export default AuthRoute
