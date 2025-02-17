import React from 'react'

import './index.scss'

interface Props {
  // 系统Logo图片地址
  logoUrl: string
  // 系统名称
  websiteName: string
}

const WebsiteLogo: React.FC<Props> = ({ logoUrl, websiteName }) => {
  return (
    <div className="logo-container">
      <img src={logoUrl} alt="website-logo" className="website-logo" />
      <em className="website-name">{websiteName}</em>
    </div>
  )
}

export default WebsiteLogo
