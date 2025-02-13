import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/store'
import { fetchUserInfo } from '@/store/modules/user'

const Layout: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>()

  const userStore = useSelector(
    (state: ReturnType<typeof store.getState>) => state.userReducer,
  )
  console.log(userStore.userInfo)

  // 组件挂载时获取用户信息
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [])

  return <div>Layout Page</div>
}

export default Layout
