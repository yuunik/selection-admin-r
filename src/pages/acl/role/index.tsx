import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Table, message, Modal } from 'antd'
import type { TableProps } from 'antd'
import { RedoOutlined, SearchOutlined } from '@ant-design/icons'

import type { SysRoleType, RoleNameType } from '@/types/acl'
import type { PageParamsType } from '@/types'
import { pageRoleListApi } from '@/apis/roleApi.tsx'
import { addRoleApi } from '../../../apis/roleApi.tsx'

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

  // 弹窗状态
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 处理弹窗提交
  const handleSubmit = async () => {
    // 发送请求
    const {
      data: { code },
    } = await addRoleApi(roleInfo)
    if (code === 200) {
      // 关闭弹窗
      setIsModalOpen(false)
      // 刷新页面
      getRoleList()
      // 提示成功信息
      message.success('新增角色成功')
    }
  }

  // 用户信息
  const [roleInfo, setRoleInfo] = useState<SysRoleType>({} as SysRoleType)

  // 打开新增用户弹窗
  const handleOpenAddModal = () => {
    // 重置用户信息
    setRoleInfo({} as SysRoleType)
    // 打开弹窗
    setIsModalOpen(true)
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
        <Button type="primary" onClick={handleOpenAddModal}>
          新增角色
        </Button>
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
      {/* 用户信息弹窗 */}
      <Modal
        title="新增用户"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Item label="角色名称">
            <Input
              placeholder="请输入角色名称"
              value={roleInfo.roleName}
              onChange={(e) =>
                setRoleInfo({ ...roleInfo, roleName: e.target.value })
              }
            />
          </Item>
          <Item label="角色编码">
            <Input
              placeholder="请输入角色编码"
              value={roleInfo.roleCode}
              onChange={(e) =>
                setRoleInfo({ ...roleInfo, roleCode: e.target.value })
              }
            />
          </Item>
          <Item label="描述">
            <Input
              placeholder="请输入角色信息"
              value={roleInfo.description}
              onChange={(e) =>
                setRoleInfo({ ...roleInfo, description: e.target.value })
              }
            />
          </Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Role
