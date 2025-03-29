/**
 * @description user api
 */
import { request } from '@/utils'
import type { PageType, ResType } from '@/types'
import type { UserInfoType } from '@/types/login'
import type { UserQueryType, AssignUserRoleType } from '@/types/acl'

// 请求地址
enum UserApi {
  PAGE_LIST_URL = '/admin/system/user/pageUserList',
  ADD_URL = '/admin/system/user/addUser',
  EDIT_URL = '/admin/system/user/updateUser',
  DELETE_URL = '/admin/system/user/deleteUser',
  // 为用户分配角色信息
  ASSIGN_ROLE_URL = '/admin/system/user/doAssign',
}

// 分页查询用户列表
export const pageUserListApi = (
  pageNum: number,
  pageSize: number,
  userName: UserQueryType,
) =>
  request<ResType<PageType<UserInfoType[]>>>({
    url: UserApi.PAGE_LIST_URL + `/${pageNum}/${pageSize}`,
    method: 'POST',
    data: userName,
  })

// 新增用户
export const addUserApi = (userInfo: UserInfoType) =>
  request<ResType<object>>({
    url: UserApi.ADD_URL,
    method: 'POST',
    data: userInfo,
  })

// 删除用户
export const deleteUserApi = (id: number) =>
  request<ResType<object>>({
    url: UserApi.DELETE_URL + `/${id}`,
    method: 'DELETE',
  })

// 修改用户
export const editUserApi = (userInfo: UserInfoType) =>
  request<ResType<object>>({
    url: UserApi.EDIT_URL,
    method: 'PUT',
    data: userInfo,
  })

// 为用户分配角色信息
export const assignUserRoleApi = (data: AssignUserRoleType) =>
  request<ResType<object>>({
    url: UserApi.ASSIGN_ROLE_URL,
    method: 'POST',
    data: data,
  })
