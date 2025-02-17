// 后端同意返回格式类型
import type { UserInfoType } from './login/index.d.tsx'

export type ResType<T> = {
  /* 业务状态码 */
  code: number
  /* 业务消息 */
  message: string
  /* 业务数据 */
  data: T
}

// 用户状态管理库状态类型
export type UserStateType = {
  token: string
  userInfo: UserInfoType
}
