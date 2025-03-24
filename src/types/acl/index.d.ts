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
