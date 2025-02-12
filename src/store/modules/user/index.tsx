import { createSlice } from '@reduxjs/toolkit'
import type { Dispatch } from '@reduxjs/toolkit'
import { loginApi } from '@/apis/loginApi.tsx'
import type { LoginReqType } from '@/types/login'

// 用户信息 reducer
const userStore = createSlice({
  name: 'userReducer',
  initialState: {
    // 用户 token
    token: '',
    // 用户信息
    userInfo: {},
    // 密码错误次数
    pwdErrorCount: 0,
  },
  reducers: {
    // 保存用户 token
    saveToken(state, action) {
      state.token = action.payload
    },
    // 修改密码错误次数
    modifyPwdErrorCount(state) {
      state.pwdErrorCount++
    },
  },
})

// 导出 actions
const { saveToken, modifyPwdErrorCount } = userStore.actions

// 异步 actions
// 用户登录
const fetchLogin = (loginParams: LoginReqType) => {
  return async (dispatch: Dispatch) => {
    const {
      data: {
        code,
        data: { token },
      },
    } = await loginApi(loginParams)
    if (code === 201) {
      // 密码错误
      dispatch(modifyPwdErrorCount())
    }
    // 触发 saveToken action
    dispatch(saveToken(token))
  }
}

// 获取用户信息
// const fetchUserInfo = () => {}

// 导出异步 actions
export { fetchLogin }

const userReducer = userStore.reducer

export default userReducer
