import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'

import store from '@/store'

import './index.scss'
import { handleCollapse } from '../../../../../store/modules/setting'

const CustomBreadcrumb: React.FC = () => {
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

  return (
    <div className="breadcrumb-container">
      {/* 折叠图标 */}
      <div className="fold-icon" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      {/* 面包屑导航 */}
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          {
            title: <a href="">Application Center</a>,
          },
          {
            title: <a href="">Application List</a>,
          },
          {
            title: 'An Application',
          },
        ]}
      />
    </div>
  )
}

export default CustomBreadcrumb
