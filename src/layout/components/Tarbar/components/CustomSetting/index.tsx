import { Avatar, Button, Dropdown, Space, Tooltip } from 'antd'
import {
  DownOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'

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
        <Button size="small" shape="circle" icon={<FullscreenOutlined />} />
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
