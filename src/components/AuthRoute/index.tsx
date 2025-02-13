import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import store from '@/store'
import { message } from 'antd'

// 前置路由守卫
interface AuthRouteProps {
  children: React.ReactNode
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { isLogin } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.userReducer,
  )

  const navigate = useNavigate()

  useEffect(() => {
    // 获取用户信息后判断是否登录
    if (!isLogin) {
      message.error('请先登录')
      navigate('/login')
    }
  }, [])

  return <>{children}</>
}

export default AuthRoute
