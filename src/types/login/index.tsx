// 用户登录请求参数类型
export type LoginReqType = {
  // 用户名
  userName: string
  // 密码
  password: string
  // 验证码
  captcha: string
  // 验证码 key
  codeKey: string
}

// 用户登录响应参数类型
export type LoginResType = {
  // 令牌
  token: string
  // 刷新令牌
  refreshToken?: string
}

// 验证码返回类型
export type CaptchaType = {
  /* 验证码 key */
  codeKey: string
  /* 验证码图片 base64 */
  codeValue: string
}
