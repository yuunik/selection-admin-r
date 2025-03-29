/**
 * acl api
 */
import { request } from '@/utils'
import type { PageType, ResType } from '@/types'
import type { RoleQueryType, SysRoleType } from '@/types/acl'
import { UserRoleInfoType } from '../types/acl'

// 请求地址
enum RoleApi {
  // 分页查询角色
  PAGE_URL = '/admin/system/role/pageRoleList',
  // 新增角色
  ADD_URL = '/admin/system/role/addRole',
  // 修改角色
  EDIT_URL = '/admin/system/role/updateRole',
  // 删除角色
  DELETE_URL = '/admin/system/role/deleteRole',
  // 查询所有角色及用户所拥有的角色信息
  GET_USER_ROLE_LIST = '/admin/system/role/getUserRoleList',
}

// 分页查询用户角色信息
export const pageRoleListApi = (
  pageNum: number,
  pageSize: number,
  roleName: RoleQueryType,
) =>
  request<ResType<PageType<SysRoleType[]>>>({
    url: RoleApi.PAGE_URL + `/${pageNum}/${pageSize}`,
    method: 'POST',
    data: roleName,
  })

// 新增用户角色
export const addRoleApi = (role: SysRoleType) =>
  request<ResType<SysRoleType>>({
    url: RoleApi.ADD_URL,
    method: 'POST',
    data: role,
  })

// 修改用户角色
export const editRoleApi = (role: SysRoleType) =>
  request<ResType<SysRoleType>>({
    url: RoleApi.EDIT_URL,
    method: 'PUT',
    data: role,
  })

// 删除用户角色
export const deleteRoleApi = (id: number) =>
  request<ResType<void>>({
    url: RoleApi.DELETE_URL + `/${id}`,
    method: 'DELETE',
  })

// 查询所有角色及用户所拥有的角色信息
export const getUserRoleListApi = (userId: number) =>
  request<ResType<UserRoleInfoType>>({
    url: RoleApi.GET_USER_ROLE_LIST + `/${userId}`,
    method: 'GET',
  })
