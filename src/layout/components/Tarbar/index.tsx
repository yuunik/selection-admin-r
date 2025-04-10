import React, { useCallback } from 'react'

import CustomBreadcrumb from './components/CustomBreadcrumb'
import CustomSetting from './components/CustomSetting'

import './index.scss'

const Tabbar: React.FC = () => {
  const changeCollapsed = useCallback((value: boolean) => {
    console.log(value)
  }, [])

  return (
    <div className="tabbar-container">
      {/* 左侧面包屑 */}
      <CustomBreadcrumb />
      {/* 右侧设置相关按钮 */}
      <CustomSetting changeCollapsed={changeCollapsed} />
    </div>
  )
}

export default Tabbar
