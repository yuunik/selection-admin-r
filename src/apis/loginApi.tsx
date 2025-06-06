import { request } from '@/utils'
import type { ResType } from '@/types'
import type {
  LoginReqType,
  LoginResType,
  CaptchaType,
  LoginDataResType,
} from '@/types/login'

// 请求登录接口枚举
enum LoginAPI {
  LOGIN = '/admin/system/index/login',
  GENERATE_CAPTCHA = '/admin/system/index/getValidateCode',
  GET_USER_INFO = '/admin/system/index/getUserInfo',
  LOGOUT = '/admin/system/index/logout',
}

// 用户登录
export const loginApi = (data: LoginReqType) =>
  request<ResType<LoginResType>>({
    url: LoginAPI.LOGIN,
    method: 'POST',
    data: data,
  })

// 生成验证码
export const generateCaptchaApi = () =>
  request<ResType<CaptchaType>>({
    url: LoginAPI.GENERATE_CAPTCHA,
    method: 'GET',
  })

// 获取用户信息
export const getUserInfoApi = () =>
  request<ResType<LoginDataResType>>({
    url: LoginAPI.GET_USER_INFO,
    method: 'GET',
  })

// 退出登录
export const logoutApi = () =>
  request<ResType<any>>({
    url: LoginAPI.LOGOUT,
    method: 'GET',
  })
