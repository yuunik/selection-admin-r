import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message, notification } from 'antd'
import { useNavigate } from 'react-router-dom'

import store from '@/store'
import { fetchUserInfo } from '@/store/modules/user'
import { greeting } from '@/utils'
import WebsiteLogo from './components/WebsiteLogo'

import './index.scss'
import settings from '@/settings'

const Layout: React.FC = () => {
  // 获取dispatch
  const dispatch = useDispatch<typeof store.dispatch>()
  // 获取导航
  const navigate = useNavigate()
  // 获取用户信息
  const { userInfo } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.userReducer,
  )
  // 获取网站设置
  const { logoUrl, websiteTitle, isShowLogo } = settings

  // 组件挂载时获取用户信息
  useEffect(() => {
    getUserInfo()
  }, [])

  // 问候语提示工具
  const { timeMsg, timeIcon } = greeting()
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

  // 显示欢迎信息
  const [isShowGreeting, setIsShowGreeting] = useState(false)
  useEffect(() => {
    if (!isShowGreeting && userInfo.id) {
      // 显示问候语
      notification.success({
        message: timeMsg,
        description: `欢迎回来，${userInfo?.name}`,
        icon: timeIcon,
      })
      // 不再显示
      setIsShowGreeting(true)
    }
  }, [userInfo])

  return (
    <div className="layout-container">
      {/* 左侧菜单栏 */}
      <nav className="layout-slider">
        {/* 网页logo */}
        {isShowLogo && (
          <WebsiteLogo logoUrl={logoUrl} websiteName={websiteTitle} />
        )}
      </nav>
      {/* 右侧内容 */}
      <div className="layout-main">
        {/* 头部导航栏 */}
        <header className="main-tabbar"></header>
        {/* 内容区域 */}
        <main className="main-content">content</main>
      </div>
    </div>
  )
}

export default Layout
