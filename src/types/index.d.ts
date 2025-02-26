// 后端同意返回格式类型
import React from 'react'
import type { RouteObject } from 'react-router-dom'

import type { UserInfoType } from './login'

export type ResType<T> = {
  /* 业务状态码 */
  code: number
  /* 业务消息 */
  message: string
  /* 业务数据 */
  data: T
}

// 路由元信息类型
export type RouteMetaType = {
  title?: string
  icon?: React.ReactNode
  isShow?: boolean
}

// 路由类型
export type RouteType = RouteObject & {
  /* 路由名称 */
  name?: string
  children?: RouteType[]
  /* 路由源信息 */
  meta?: RouteMetaType
}

// 用户状态管理库状态类型
export type UserStateType = {
  /* 用户token */
  token: string
  /* 用户信息 */
  userInfo: UserInfoType
  /* 菜单路由 */
  menuRoutes: RouteType[]
}

// 布局设置状态管理库数据类型
export type LayoutSettingStateType = {
  /* 菜单栏折叠状态 */
  collapsed: boolean
  /* 二级路由的 key 值*/
  key: number
}
