import { request } from '@/utils'
import type { ResType } from '@/types'
import type { PermissionType } from '@/types/acl'

const baseUrl = '/admin/system/menu'

enum PermissionApi {
  GET_ALL_PERMISSION_URL = `${baseUrl}/getMenuList`,
  ADD_PERMISSION_URL = `${baseUrl}/addMenu`,
  UPDATE_PERMISSION_URL = `${baseUrl}/updateMenu`,
  DELETE_PERMISSION_URL = `${baseUrl}/deleteMenu`,
}

// get all permission
export const getAllPermissionApi = () =>
  request<ResType<PermissionType[]>>({
    url: PermissionApi.GET_ALL_PERMISSION_URL,
    method: 'GET',
  })

// add permission
export const addPermissionApi = (sysMenu: PermissionType) =>
  request<ResType<object>>({
    url: PermissionApi.ADD_PERMISSION_URL,
    method: 'POST',
    data: sysMenu,
  })

// update permission
export const updatePermissionApi = () => (sysMenu: PermissionType) =>
  request<ResType<object>>({
    url: `${PermissionApi.UPDATE_PERMISSION_URL}`,
    method: 'PUT',
    data: sysMenu,
  })

// delete permission
export const deletePermissionApi = () => (id: number) =>
  request<ResType<object>>({
    url: `${PermissionApi.DELETE_PERMISSION_URL}/${id}`,
    method: 'DELETE',
  })
