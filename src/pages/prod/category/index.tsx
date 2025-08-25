import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Select, Table, TableProps } from 'antd'
import { MenuUnfoldOutlined } from '@ant-design/icons'

import { getCategoryListApi } from '@/apis/category.tsx'
import { CategoryType } from '@/types/prod'

const columns: TableProps<CategoryType>['columns'] = [
  {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '图标',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (value) => (
      <Avatar size={20} src={value} onError={() => true}>
        <MenuUnfoldOutlined />
      </Avatar>
    ),
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    key: 'orderNum',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
]

const Category: React.FC = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([])

  const level1CategoryList = useMemo(
    () =>
      categoryList.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categoryList],
  )

  const getCategoryList = async () => {
    const {
      data: { data },
    } = await getCategoryListApi()
    setCategoryList(data)
  }

  const onSelectChange = () => {}

  const onSelectSearch = () => {}

  useEffect(() => {
    getCategoryList().then()
  }, [])

  return (
    <section>
      <div className="shadow-default flex items-center justify-between rounded-[8px] bg-white p-[20px]">
        <div className="flex items-center gap-[8px]">
          <label>一级分类:</label>
          <Select
            showSearch
            placeholder="-- Select --"
            optionFilterProp="label"
            onChange={onSelectChange}
            onSearch={onSelectSearch}
            options={level1CategoryList}
          />
        </div>
        <div className="flex items-center gap-[8px]">
          <label>二级分类:</label>
          <Select
            showSearch
            placeholder="-- Select --"
            optionFilterProp="label"
            onChange={onSelectChange}
            onSearch={onSelectSearch}
            options={level1CategoryList}
          />
        </div>
        <div className="flex items-center gap-[8px]">
          <label>三级分类:</label>
          <Select
            showSearch
            placeholder="-- Select --"
            optionFilterProp="label"
            onChange={onSelectChange}
            onSearch={onSelectSearch}
            options={level1CategoryList}
          />
        </div>
      </div>

      <div className="shadow-default mt-[20px] rounded-[8px]">
        <Table<CategoryType>
          columns={columns}
          dataSource={categoryList}
          rowKey="id"
        />
      </div>
    </section>
  )
}

export default Category
