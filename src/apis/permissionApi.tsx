import { request } from '@/utils'
import { ResType } from '../types'
import { PermissionType } from '../types/acl'

const baseUrl = '/admin/system/menu'

enum PermissionApi {
  GET_ALL_PERMISSION_URL = `${baseUrl}/getMenuList`,
}

// get all permission
export const getAllPermissionApi = () =>
  request<ResType<PermissionType[]>>({
    url: PermissionApi.GET_ALL_PERMISSION_URL,
    method: 'GET',
  })
