import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Table, message } from 'antd'
import type { TableProps } from 'antd'
import { RedoOutlined, SearchOutlined } from '@ant-design/icons'

import type { SysRoleType } from '@/types/acl'
import { PageParamsType } from '../../../types'
import { pageRoleListApi } from '../../../apis/roleApi.tsx'
import { RoleNameType } from '../../../types/acl'

const Item = Form.Item

// 角色列表列配置
const columns: TableProps<SysRoleType>['columns'] = [
  {
    title: '角色id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 100,
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
    align: 'center',
  },
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    key: 'roleCode',
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <>
        <Button type="link">编辑</Button>
        <Button type="link" className="ml-4">
          删除
        </Button>
      </>
    ),
    align: 'center',
  },
]

const Role: React.FC = () => {
  // 角色列表数据
  const [roleListData, setRoleListData] = useState<SysRoleType[]>([])

  // 分页参数
  const [pageParams, setPageParams] = useState<PageParamsType>({
    pageNum: 1,
    pageSize: 5,
  })

  // 用户角色搜索条件
  const [role, setRole] = useState<RoleNameType>({
    roleName: '',
  })

  // 角色列表总条数
  const [total, setTotal] = useState<number>(0)

  // 分页查询用户角色列表
  const getRoleList = async (pageNum = 1) => {
    setPageParams({ ...pageParams, pageNum })
    const {
      data: {
        code,
        data: { list, total },
      },
    } = await pageRoleListApi(pageNum, pageParams.pageSize, role)
    if (code === 200) {
      // 更新角色列表数据
      setRoleListData(list.map((role) => ({ key: role.id, ...role })))
      // 更新数据总条数
      setTotal(total)
    }
  }

  // 组件挂载完成后，查询用户角色列表
  useEffect(() => {
    getRoleList(pageParams.pageNum > 1 ? pageParams.pageNum : undefined)
  }, [pageParams.pageNum])

  // 角色名称搜索
  const handleSearchRole = () => {
    // 非空校验
    if (role.roleName === '') {
      return message.info('请输入角色名称')
    }
    // 查询角色列表
    getRoleList()
    // 清空搜索框
    setRole({ roleName: '' })
  }

  // 重置搜索条件
  const handleReset = () => {
    // 清空搜索框
    setRole({ roleName: '' })
    // 重置分页参数
    setPageParams({ pageNum: 1, pageSize: 5 })
    // 重新渲染页面
    getRoleList()
  }

  return (
    <div>
      {/* 角色名称搜索框 */}
      <div className="shadow-default rounded-[4px] p-[20px]">
        <Form layout="inline" className="flex items-center justify-between">
          <Item label="角色名称">
            <Input
              placeholder="请输入角色名称"
              value={role.roleName}
              onChange={(e) => setRole({ roleName: e.target.value })}
            />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              onClick={handleSearchRole}
            >
              搜索
            </Button>
            <Button
              type="default"
              htmlType="reset"
              icon={<RedoOutlined />}
              className="ml-12"
              onClick={handleReset}
            >
              重置
            </Button>
          </Item>
        </Form>
      </div>
      {/* 角色列表 */}
      <div className="shadow-default mt-[20px] rounded-[4px] p-[20px]">
        {/* 新增角色按钮 */}
        <Button type="primary">新增角色</Button>
        {/* 角色列表 */}
        <Table
          dataSource={roleListData}
          columns={columns}
          className="mt-[10px]"
          pagination={{
            position: ['bottomRight'],
            total: total,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条数据`,
            current: pageParams.pageNum,
            pageSize: pageParams.pageSize,
            pageSizeOptions: [1, 3, 5, 7, 9, 11],
            onChange: (pageNum, pageSize) =>
              setPageParams({ pageNum, pageSize }),
          }}
          bordered
        />
      </div>
    </div>
  )
}

export default Role
