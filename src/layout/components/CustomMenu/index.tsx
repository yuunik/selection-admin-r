import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useSelector } from 'react-redux'

import store from '@/store'
import type { RouteType } from '@/types/index.d.tsx'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const CustomMenu: React.FC = () => {
  // 菜单路由
  const { menuRoutes, collapsed } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.userReducer,
  )
  // 菜单项列表
  const [menuItems, setMenuItems] = useState<MenuItem[]>()

  // 获取菜单项列表
  const getMenuItems = (menuRoutes: RouteType[]) => {
    const menuItems: MenuItem[] = []
    menuRoutes.forEach((route) => {
      // 路由没有子路由，则直接添加到菜单中
      if (!route.children && route.meta?.isShow) {
        menuItems.push({
          key: route.path as string,
          label: route.meta?.title,
          icon: route.meta?.icon,
        })
      }
      // 路由只有一个子路由，则添加到菜单中
      if (route.children?.length === 1 && route.children[0].meta?.isShow) {
        menuItems.push({
          key: route.children[0].path as string,
          label: route.children[0].meta?.title,
          icon: route.children[0].meta?.icon,
        })
      }
      // 路由有多个子路由，则添加到菜单中
      if (route.children && route.children.length > 1 && route.meta?.isShow) {
        menuItems.push({
          key: route.path as string,
          label: route.meta?.title,
          icon: route.meta?.icon,
          children: getMenuItems(route.children),
        })
      }
    })
    return menuItems
  }

  // 监听菜单路由变化，更新菜单项列表
  useEffect(() => {
    // 获取菜单项列表
    setMenuItems(getMenuItems(menuRoutes))
  }, [menuRoutes])

  // 获取导航
  const navigate = useNavigate()
  // 点击菜单项，跳转页面
  const onGoToPage: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <Menu
      defaultSelectedKeys={['/']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      items={menuItems}
      onClick={onGoToPage}
    />
  )
}

export default CustomMenu
