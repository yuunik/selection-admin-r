import { Avatar, Button, Dropdown, Space, Tooltip } from 'antd'
import {
  DownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import store from '@/store'
import { handleKey } from '@/store/modules/setting'

import './index.scss'

const CustomSetting = () => {
  // 获取dispatch
  const dispatch = useDispatch<typeof store.dispatch>()

  // 刷新页面
  const onRefresh = () => {
    dispatch(handleKey())
  }

  // 全屏状态
  const [isFullscreen, setIsFullscreen] = useState(false)
  // 切换全屏
  const onSizeChange = () => {
    if (!document.fullscreenElement) {
      // 进入全屏
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      // 退出全屏
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // 监听屏幕大小变化
  const onResize = () => {
    if (
      window.screen.width === document.documentElement.clientWidth &&
      document.documentElement.clientHeight === window.screen.height
    ) {
      setIsFullscreen(true)
    } else {
      setIsFullscreen(false)
    }
  }

  // 监听屏幕大小变化
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="website-setting">
      <Tooltip title="刷新">
        <Button
          size="small"
          shape="circle"
          icon={<ReloadOutlined />}
          onClick={onRefresh}
        />
      </Tooltip>
      <Tooltip title="全屏">
        <Button
          size="small"
          shape="circle"
          icon={
            isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
          }
          onClick={onSizeChange}
        />
      </Tooltip>
      <Tooltip title="自定义设置">
        <Button size="small" shape="circle" icon={<SettingOutlined />} />
      </Tooltip>
      {/* 用户头像 */}
      <Avatar size="small" icon={<UserOutlined />} />
      {/* 用户名 */}
      <Dropdown
        menu={{
          items: [
            {
              key: '4',
              danger: true,
              label: '退出登录',
            },
          ],
        }}
      >
        <a>
          <Space>
            <em>用户名</em>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default CustomSetting
