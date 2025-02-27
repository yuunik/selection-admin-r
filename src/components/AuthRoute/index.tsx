import React, { useEffect, useState } from 'react'
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

const AuthRoute: React.FC<AuthRouteProp> = ({ component }) => {
  // 增加加载状态
  const [isChecking, setIsChecking] = useState(true)
  // 获取当前路由信息
  const { token, userInfo } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.userReducer,
  )
  // 获取当前路由信息
  const dispatch = useDispatch<typeof store.dispatch>()
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      NProgress.start()
      try {
        if (token) {
          // 登录状态下, 不能访问登录页面, 跳转首页
          if (location.pathname === '/login') {
            message.info('您已登录, 正在跳转首页')
            return <Navigate to="/" replace />
          }
          // 用户信息为空则获取用户信息
          if (!Object.keys(userInfo).length) {
            await dispatch(fetchUserInfo())
          }
        } else {
          if (location.pathname !== '/login') {
            message.warning('请先登录')
            return (
              <Navigate to={`/login?redirect=${location.pathname}`} replace />
            )
          }
        }
      } catch (error) {
        message.error((error as Error).message)
        return <Navigate to={`/login?redirect=${location.pathname}`} replace />
      } finally {
        setIsChecking(false)
        NProgress.done()
      }
    }

    checkAuth()
    dispatch(saveMenuRoutes(constantRoutes))
  }, [token, userInfo, location])

  if (isChecking) return <div>Loading...</div> // 显示加载动画

  // 最终渲染判断
  if (token && location.pathname !== '/login') {
    return <>{component}</>
  }

  return location.pathname === '/login' ? (
    <>{component}</>
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} replace />
  )
}

export default AuthRoute
