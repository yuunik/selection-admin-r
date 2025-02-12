import { request } from '@/utils'
import type { ResType } from '@/types'
import type { LoginReqType, LoginResType } from '@/types/login'
import { CaptchaType } from '../types/login'

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
