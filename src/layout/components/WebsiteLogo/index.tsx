import React from 'react'
import { useSelector } from 'react-redux'

import store from '@/store'

import './index.scss'

interface Props {
  // 系统Logo图片地址
  logoUrl: string
  // 系统名称
  websiteName: string
}

const WebsiteLogo: React.FC<Props> = ({ logoUrl, websiteName }) => {
  // 获取侧边栏收缩状态
  const { collapsed } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.layoutSettingReducer,
  )

  return (
    <div className="logo-container">
      <img src={logoUrl} alt="website-logo" className="website-logo" />
      <em
        className="website-name"
        style={{ display: collapsed ? 'none' : 'block' }}
      >
        {websiteName}
      </em>
    </div>
  )
}

export default WebsiteLogo
