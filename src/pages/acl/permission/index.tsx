import React, { useEffect, useState } from 'react'
import { Button, Table, TableProps } from 'antd'
import type { PermissionType } from '@/types/acl'
import { getAllPermissionApi } from '@/apis/permissionApi.tsx'

const permissionColumns: TableProps<PermissionType>['columns'] = [
  {
    title: '菜单标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: '路由名称',
    dataIndex: 'component',
    key: 'component',
    align: 'center',
  },
  {
    title: '排序',
    dataIndex: 'sortValue',
    key: 'sortValue',
    align: 'center',
    sorter: (a, b) => a.sortValue - b.sortValue,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
    align: 'center',
    key: 'action',
    width: 250,
    render: () => (
      <>
        <Button type="link">编辑</Button>
        <Button type="link" danger>
          删除
        </Button>
      </>
    ),
  },
]

const Permission: React.FC = () => {
  // 权限列表
  const [permissionList, setPermissionList] = useState<PermissionType[]>()

  // 获取权限列表
  const getPermissionList = async () => {
    const {
      data: { code, data },
    } = await getAllPermissionApi()
    if (code === 200) {
      setPermissionList(data)
    }
  }

  // 组件挂载时获取权限列表
  useEffect(() => {
    getPermissionList()
  }, [])

  return (
    <div className="h-full">
      <div className="shadow-default rounded-[4px] p-[20px]">
        <Button type="primary">新增权限</Button>
      </div>
      <Table
        dataSource={permissionList}
        columns={permissionColumns}
        className="shadow-default mt-[20px] rounded-[4px]"
        bordered
        rowKey="id"
        scroll={{
          scrollToFirstRowOnChange: true,
          y: 700,
        }}
      />
    </div>
  )
}

export default Permission
