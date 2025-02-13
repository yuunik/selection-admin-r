import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import store from '@/store'
import { fetchUserInfo } from '@/store/modules/user'

const Layout: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>()

  // 组件挂载时获取用户信息
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [])

  return <div>Layout Page</div>
}

export default Layout
