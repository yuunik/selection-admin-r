import { createSlice } from '@reduxjs/toolkit'

import type { LayoutSettingStateType } from '@/types'

const useLayoutSettingStore = createSlice({
  name: 'layoutSettingReducer',
  initialState: {
    // 菜单栏是否折叠
    collapsed: false,
  } as LayoutSettingStateType,
  reducers: {
    handleCollapse: (state, action) => {
      state.collapsed = action.payload
    },
  },
})

const { handleCollapse } = useLayoutSettingStore.actions
// 导出 action
export { handleCollapse }

// 导出 reducer
const layoutSettingReducer = useLayoutSettingStore.reducer
export default layoutSettingReducer
