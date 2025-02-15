import { createSlice } from '@reduxjs/toolkit'
import type { Dispatch } from '@reduxjs/toolkit'
//@ts-expect-error 无相关类型定义申明
import Cookie from 'js-cookie'

import { loginApi } from '@/apis/loginApi.tsx'
import type { LoginReqType } from '@/types/login'
import { getUserInfoApi } from '@/apis/loginApi.tsx'

// 用户信息 reducer
const userStore = createSlice({
  name: 'userReducer',
  initialState: {
    // 用户 token
    token: Cookie.get('token') || '',
    // 用户信息
    userInfo: {},
  },
  reducers: {
    // 保存用户 token
    saveToken(state, action) {
      state.token = action.payload
      // token 存放入 Cookie
      Cookie.set('token', state.token, {
        domain: 'localhost',
        expires: 7,
      })
    },
    // 保存用户信息
    saveUserInfo(state, actions) {
      state.userInfo = actions.payload
    },
  },
})

// 导出 actions
const { saveToken, saveUserInfo } = userStore.actions

// 异步 actions
// 用户登录
const fetchLogin = (loginParams: LoginReqType) => {
  return async (dispatch: Dispatch) => {
    const {
      data: {
        code,
        data: { token },
        message: errorMessage,
      },
    } = await loginApi(loginParams)
    if (code === 200) {
      // 触发 saveToken action
      dispatch(saveToken(token))
      return 'ok'
    } else {
      return Promise.reject(new Error(errorMessage))
    }
  }
}

// 获取用户信息
const fetchUserInfo = () => {
  return async (dispatch: Dispatch) => {
    const {
      data: { code, data, message: errorMessage },
    } = await getUserInfoApi()
    if (code === 200) {
      // 触发 saveUserInfo action
      dispatch(saveUserInfo(data))
      return 'ok'
    } else {
      return Promise.reject(new Error(errorMessage))
    }
  }
}

// 导出异步 actions
export { fetchLogin, fetchUserInfo }

const userReducer = userStore.reducer

export default userReducer
