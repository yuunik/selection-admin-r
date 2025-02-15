import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

import store from '@/store'
import { fetchUserInfo } from '@/store/modules/user'

const Layout: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>()
  // 获取导航
  const navigate = useNavigate()

  // 组件挂载时获取用户信息
  useEffect(() => {
    getUserInfo()
  }, [])

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      await dispatch(fetchUserInfo())
    } catch (error) {
      // 用户未登录
      message.error((error as Error).message)
      // 跳转登录页面
      navigate('/login')
    }
  }

  return <div>Layout Page</div>
}

export default Layout
