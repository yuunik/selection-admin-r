import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import store from '@/store'
import type { RouteType } from '@/types'
import { handleKey } from '@/store/modules/setting'

type MenuItem = Required<MenuProps>['items'][number]

interface CustomMenuProps {
  menuRoutes: RouteType[]
}

const CustomMenu: React.FC<CustomMenuProps> = ({ menuRoutes }) => {
  // 获取布局设置信息
  const { collapsed } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.layoutSettingReducer,
  )
  // 菜单项列表
  const [menuItems, setMenuItems] = useState<MenuItem[]>()
  const { pathname } = useLocation()
  // 当前选中项
  const [current, setCurrent] = useState<string[]>()
  // 默认展开的菜单项
  const [defaultOpenKeys] = useState<string>(`/${pathname.split('/')[1]}`)

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

  useEffect(() => {
    // 设置默认展开的菜单项
    setCurrent([pathname])
  }, [pathname])

  // 获取导航
  const navigate = useNavigate()
  // 获取dispatch
  const dispatch = useDispatch()
  // 点击菜单项，跳转页面
  const onGoToPage: MenuProps['onClick'] = ({ key }) => {
    // 跳转二级路由页面
    navigate(key)
    // 设置当前选中项
    setCurrent([key])
    // 更新key
    dispatch(handleKey())
  }

  return (
    <Menu
      selectedKeys={current}
      defaultOpenKeys={[defaultOpenKeys]}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      items={menuItems}
      onClick={onGoToPage}
    />
  )
}

export default CustomMenu
