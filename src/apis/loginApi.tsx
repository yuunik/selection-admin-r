import { request } from '@/utils'
import type { ResType } from '@/types'
import type { LoginReqType, LoginResType } from '@/types/login'
import { CaptchaType, UserInfoType } from '../types/login/index.d.tsx'

// 请求登录接口枚举
enum LoginAPI {
  LOGIN = '/admin/system/index/login',
  GENERATE_CAPTCHA = '/admin/system/index/getValidateCode',
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
  request<ResType<UserInfoType>>({
    url: '/admin/system/index/getUserInfo',
    method: 'GET',
  })
