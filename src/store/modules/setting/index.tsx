import { createSlice } from '@reduxjs/toolkit'

import type { LayoutSettingStateType } from '@/types'

const layoutSettingStore = createSlice({
  name: 'layoutSettingReducer',
  initialState: {
    // 菜单栏是否折叠
    collapsed: false,
    // 二级路由的 key 值
    key: 0,
  } as LayoutSettingStateType,
  reducers: {
    handleCollapse: (state, action) => {
      state.collapsed = action.payload
    },
    handleKey: (state) => {
      state.key++
    },
  },
})

const { handleCollapse, handleKey } = layoutSettingStore.actions
// 导出 action
export { handleCollapse, handleKey }

// 导出 reducer
const layoutSettingReducer = layoutSettingStore.reducer
export default layoutSettingReducer
