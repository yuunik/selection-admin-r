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

// 用户信息类型
export type UserInfoType = {
  // 用户 id
  id: number
  /* 用户名 */
  userName: string
  /* 密码 */
  password: string
  /* 昵称 */
  name: string
  /* 手机号码 */
  phone: string
  /* 头像 */
  avatar: string
  /* 描述 */
  description: string
  /* 用户状态 */
  status: number
}

// 登录接口所返回的数据类型
export type LoginDataResType = {
  /* 用户信息 */
  userInfo: UserInfoType
  /* 按钮权限列表 */
  buttonList: string[]
  /* 角色列表 */
  roleList: string[]
  /* 路由列表 */
  routeList: string[]
}
