import React, { memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import { useLocation } from 'react-router-dom'

import store from '@/store'
import { greeting } from '@/utils'
import useRedirect from '@/hooks/useRedirect.tsx'
import settings from '@/settings'
import WebsiteLogo from './components/WebsiteLogo'
import CustomMenu from './components/CustomMenu'
import MainContent from './components/MainContent'
import Tabbar from './components/Tarbar'

import './index.scss'

const Layout: React.FC = () => {
  // 获取用户信息
  const { userInfo, menuRoutes } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.userReducer,
  )
  // 获取布局设置信息
  const { collapsed } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.layoutSettingReducer,
  )
  // 获取网站设置
  const { logoUrl, websiteTitle, isShowLogo } = useMemo(() => settings, [])

  // 问候语提示工具
  const { timeMsg, timeIcon } = greeting()

  // 显示欢迎信息
  const [isShowGreeting, setIsShowGreeting] = useState(false)
  // 显示欢迎信息
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

  const redirect = useRedirect()
  const location = useLocation()
  // 主页重定向
  useEffect(() => {
    if (location.pathname !== '/screen') {
      redirect(location.pathname)
    }
  }, [location.pathname])
  // 用户权限路由
  const routes = useMemo(() => menuRoutes, [menuRoutes])

  // Logo 做缓存处理
  const Logo = memo(WebsiteLogo)
  // 菜单栏做缓存处理
  const Menu = memo(CustomMenu)
  // Tabbar 做缓存处理
  const Tab = memo(Tabbar)

  return (
    <div className="layout-container">
      {/* 左侧菜单栏 */}
      <nav className={`layout-slider ${collapsed ? 'fold' : ''}`}>
        {/* 网页logo */}
        {isShowLogo && <Logo logoUrl={logoUrl} websiteName={websiteTitle} />}
        {/* 菜单栏 */}
        <Menu menuRoutes={routes} />
      </nav>
      {/* 右侧内容 */}
      <div className={`layout-main ${collapsed ? 'expand' : ''}`}>
        {/* 头部导航栏 */}
        <header className="main-tabbar">
          <Tab />
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
