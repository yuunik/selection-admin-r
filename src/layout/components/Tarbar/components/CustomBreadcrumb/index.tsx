import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { useMatches } from 'react-router-dom'

import store from '@/store'
import { handleCollapse } from '@/store/modules/setting'
import useMeta from '@/hooks/useMeta.tsx'
import type { RouteMetaType } from '@/types'

import './index.scss'

const CustomBreadcrumb = () => {
  // 获取布局设置信息
  const { collapsed } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.layoutSettingReducer,
  )

  // 获取触发对象
  const dispatch = useDispatch<typeof store.dispatch>()

  // 切换折叠状态
  const toggleCollapsed = () => {
    dispatch(handleCollapse(!collapsed))
  }

  const pathnameArr = useMatches().map((match) => match.pathname)
  const metaArr = useMeta(pathnameArr)
  // 面包屑导航数据
  const breadcrumbArr = useMemo(
    () =>
      metaArr
        .map(
          ({
            title,
            icon,
            pathname: href,
            isShow,
          }: RouteMetaType & { pathname: string }) => {
            if (isShow) {
              return {
                href,
                title: (
                  <>
                    {icon}
                    <span>{title}</span>
                  </>
                ),
              }
            }
          },
        )
        .filter((item) => item !== undefined),
    [],
  )

  return (
    <div className="breadcrumb-container">
      {/* 折叠图标 */}
      <div className="fold-icon" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      {/* 面包屑导航 */}
      <Breadcrumb items={breadcrumbArr} />
    </div>
  )
}

export default CustomBreadcrumb
