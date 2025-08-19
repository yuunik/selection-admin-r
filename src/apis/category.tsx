import { request } from '@/utils'
import { ResType } from '@/types'
import { CategoryType } from '@/types/prod'

// 请求地址统一管理
enum CategoryApi {
  GET_CATEGORY_LIST = '/admin/system/category/getCategoryListForAntDesign',
}

// 获取分类列表
export const getCategoryListApi = () =>
  request<ResType<CategoryType[]>>({
    url: CategoryApi.GET_CATEGORY_LIST,
    method: 'GET',
  })
