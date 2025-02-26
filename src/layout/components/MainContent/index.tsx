import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import store from '@/store'

import './index.scss'

const MainContent = () => {
  // 获取 key 值
  const { key } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.layoutSettingReducer,
  )

  return (
    <div className="router-container" key={key}>
      <Outlet />
    </div>
  )
}

export default MainContent
