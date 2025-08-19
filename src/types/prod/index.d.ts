/* 商品分类数据类型 */
export type CategoryType = {
  id?: number
  name: string
  parentId: number
  isDeleted: number
  imageUrl: string
  status: number
  orderNum: number
  hasChildren: boolean
  children: CategoryType[]
  createTime: string
  updateTime: string
}
