// 后端同意返回格式类型
export type ResType<T> = {
  /* 业务状态码 */
  code: number
  /* 业务消息 */
  message: string
  /* 业务数据 */
  data: T
}
