/**
 * ACL types
 */

// 用户角色类型
export type SysRoleType = {
  // 角色id
  id?: number
  // 角色创建时间
  createTime?: string
  // 角色更新时间
  updateTime?: string
  // 角色是否删除
  isDeleted?: number
  // 角色名称
  roleName: string
  // 角色编码
  roleCode: string
  // 角色描述
  description: string
}

// 用户角色分页查询数据类型
export type RoleQueryType = {
  roleName: string
}

// 用户分页查询数据类型
export type UserQueryType = {
  /* 搜索关键字 */
  keyword: string
  /* 开始时间 */
  createTimeBegin: string
  /* 结束时间 */
  createTimeEnd: string
}

// 查询用户角色接口的数据类型
export type UserRoleInfoType = {
  /* 所有角色列表 */
  sysRoleList: SysRoleType[]
  /* 用户角色id列表 */
  userRoleIdList: number[]
}

// 分配用户角色的数据类型
export type AssignUserRoleType = {
  /* 用户id */
  userId: number
  /* 所分配角色id列表 */
  roleIdList: number[]
}

// 菜单类型
export type PermissionType = {
  /* 菜单id */
  id: number
  // 菜单创建时间
  createTime?: string
  // 菜单更新时间
  updateTime?: string
  // 是否删除
  isDeleted?: number
  /* 父菜单id */
  parentId: number
  /* 菜单名称 */
  title: string
  /* 路由名称 */
  component: string
  /* 排序值 */
  sortValue: number
  /* 菜单状态 */
  status: number
  /* 子菜单 */
  children: PermissionType[]
}
