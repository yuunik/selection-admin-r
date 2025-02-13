import { createSlice } from '@reduxjs/toolkit'
import type { Dispatch } from '@reduxjs/toolkit'
import { message } from 'antd'

import { loginApi } from '@/apis/loginApi.tsx'
import type { LoginReqType } from '@/types/login'
import { getUserInfoApi } from '@/apis/loginApi.tsx'

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
    // 是否登录
    isLogin: false,
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
    // 保存用户信息
    saveUserInfo(state, actions) {
      state.userInfo = actions.payload
    },
    // 修改登录状态
    modifyIsLogin(state, action) {
      state.isLogin = action.payload
    },
  },
})

// 导出 actions
const { saveToken, modifyPwdErrorCount, saveUserInfo, modifyIsLogin } =
  userStore.actions

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
    // 登录成功
    message.success('登录成功')
    // 触发 modifyIsLogin action
    dispatch(modifyIsLogin(true))
    // 触发 saveToken action
    dispatch(saveToken(token))
  }
}

// 获取用户信息
const fetchUserInfo = () => {
  return async (dispatch: Dispatch) => {
    const {
      data: { code, data },
    } = await getUserInfoApi()
    if (code === 208) {
      // 未登录
      message.error('请先登录')
      dispatch(modifyIsLogin(false))
    } else {
      // 触发 saveUserInfo action
      dispatch(saveUserInfo(data))
    }
  }
}

// 导出异步 actions
export { fetchLogin, fetchUserInfo }

const userReducer = userStore.reducer

export default userReducer
