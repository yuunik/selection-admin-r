import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, message, notification } from 'antd'
import { useNavigate } from 'react-router-dom'

import store from '@/store'
import { fetchUserInfo } from '@/store/modules/user'
import { greeting } from '@/utils'
import WebsiteLogo from './components/WebsiteLogo'
import settings from '@/settings'
import CustomMenu from './components/CustomMenu'
import { saveCollapsed } from '@/store/modules/user'
import MainContent from './components/MainContent'

import './index.scss'

const Layout: React.FC = () => {
  // 获取dispatch
  const dispatch = useDispatch<typeof store.dispatch>()
  // 获取导航
  const navigate = useNavigate()
  // 获取用户信息
  const { userInfo, collapsed } = useSelector(
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

  // 菜单栏折叠
  const handleToggle = () => {
    dispatch(saveCollapsed(!collapsed))
  }

  return (
    <div className="layout-container">
      {/* 左侧菜单栏 */}
      <nav className={`layout-slider ${collapsed ? 'fold' : ''}`}>
        {/* 网页logo */}
        {isShowLogo && (
          <WebsiteLogo logoUrl={logoUrl} websiteName={websiteTitle} />
        )}
        {/* 菜单栏 */}
        <CustomMenu />
      </nav>
      {/* 右侧内容 */}
      <div className={`layout-main ${collapsed ? 'expand' : ''}`}>
        {/* 头部导航栏 */}
        <header className="main-tabbar">
          <Button type="primary" onClick={handleToggle}>
            按钮1
          </Button>
        </header>
        {/* 内容区域 */}
        <main className="main-content">
          {/* 二级路由内容 */}
          <MainContent />
        </main>
      </div>
    </div>
  )
}

export default Layout
