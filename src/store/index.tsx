import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'
import layoutSettingReducer from './modules/setting'

const redux = configureStore({
  reducer: {
    // 用户信息
    userReducer,
    // 布局设置
    layoutSettingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default redux
