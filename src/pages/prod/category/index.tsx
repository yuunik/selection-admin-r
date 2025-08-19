import React, { useEffect, useMemo, useState } from 'react'

import { getCategoryListApi } from '@/apis/category.tsx'
import { CategoryType } from '@/types/prod'
import { Select, Table, TableProps } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'

const columns: TableProps<CategoryType>['columns'] = [
  {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '图标',
    dataIndex: 'orderNum',
    key: 'orderNum',
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

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<CategoryType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    )
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  },
}

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

  const [checkStrictly] = useState(false)

  useEffect(() => {
    getCategoryList()
  }, [])

  return (
    <section>
      <div className="shadow-default rounded-[8px] bg-white p-[20px]">
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
      </div>

      <div className="shadow-default mt-[20px] rounded-[8px]">
        <Table<CategoryType>
          columns={columns}
          dataSource={categoryList}
          rowSelection={{ ...rowSelection, checkStrictly }}
        />
      </div>
    </section>
  )
}

export default Category
