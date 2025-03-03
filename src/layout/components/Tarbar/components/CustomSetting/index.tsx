import {
  Avatar,
  Button,
  Dropdown,
  message,
  Popconfirm,
  Space,
  Tooltip,
} from 'antd'
import {
  DownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import store from '@/store'
import { handleKey } from '@/store/modules/setting'
import { fetchLogout } from '@/store/modules/user'

import './index.scss'

interface PropsType {
  changeCollapsed?: (value: boolean) => void
}

const CustomSetting = ({ changeCollapsed }: PropsType) => {
  // 获取dispatch
  const dispatch = useDispatch<typeof store.dispatch>()
  // 获取用户信息
  const userInfo = useSelector(
    (state: ReturnType<typeof store.getState>) => state.userReducer.userInfo,
  )

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

  // 阻止默认全屏事件, 强制使用 api 全屏
  const onStopUseF11 = (e: KeyboardEvent) => {
    if (e.key === 'F11') {
      // 阻止默认全屏事件
      e.preventDefault()
      // 强制使用 api 全屏
      onSizeChange()
    }
  }

  // 监听屏幕大小变化
  useEffect(() => {
    window.addEventListener('keydown', onStopUseF11)
    return () => {
      window.removeEventListener('keydown', onStopUseF11)
    }
  }, [])

  // 获取导航
  const navigate = useNavigate()
  // 获取当前页面路径
  const location = useLocation()
  // 退出登录
  const onLogout = async () => {
    try {
      // 清空相关信息
      await dispatch(fetchLogout())
      // 跳转到登录页面
      navigate(`/login?redirect=${location.pathname}`)
    } catch (error) {
      message.error((error as Error).message)
    }
  }

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
        <Button
          size="small"
          shape="circle"
          icon={<SettingOutlined />}
          onClick={() => changeCollapsed?.(true)}
        />
      </Tooltip>
      {/* 用户头像 */}
      <Avatar size="small" src={userInfo.avatar} />
      {/* 用户名 */}
      <Dropdown
        menu={{
          items: [
            {
              key: '4',
              danger: true,
              label: (
                <Popconfirm
                  title="提示"
                  description="是否确认退出登录?"
                  onConfirm={onLogout}
                  okText="确认"
                  cancelText="取消"
                >
                  退出登录
                </Popconfirm>
              ),
            },
          ],
        }}
      >
        <a>
          <Space>
            <em>{userInfo.name}</em>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default CustomSetting
