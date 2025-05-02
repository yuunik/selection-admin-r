import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Table,
  TableProps,
} from 'antd'
import { getAllPermissionApi } from '@/apis/permissionApi.tsx'
import type { PermissionType } from '@/types/acl'

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

const { Item } = Form
const RadioGroup = Radio.Group

const Permission: React.FC = () => {
  // 权限列表
  const [permissionList, setPermissionList] = useState<PermissionType[]>([])
  // 菜单模态框的状态
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 菜单表单数据
  const [permissionFormData, setPermissionFormData] = useState<PermissionType>(
    {} as PermissionType,
  )

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
    getPermissionList().then()
  }, [])

  // 表单提交
  const handleSubmit = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // 新增权限
  const openAddModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="h-full">
      <div className="shadow-default rounded-[4px] p-[20px]">
        <Button type="primary" onClick={openAddModal}>
          新增权限
        </Button>
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
      {/* permission modal */}
      <Modal
        title="新增菜单"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        centered
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Item label="菜单标题">
            <Input
              value={permissionFormData?.title}
              placeholder="请输入菜单标题"
              onInput={(e) =>
                setPermissionFormData({
                  ...permissionFormData,
                  title: e.currentTarget.value,
                })
              }
            />
          </Item>
          <Item label="路由名称">
            <Input
              placeholder="请输入路由名称"
              value={permissionFormData?.component}
              onInput={(e) =>
                setPermissionFormData({
                  ...permissionFormData,
                  component: e.currentTarget.value,
                })
              }
            />
          </Item>
          <Item label="排序">
            <InputNumber
              min={1}
              defaultValue={permissionFormData?.sortValue}
              value={permissionFormData?.sortValue}
              onChange={(val) =>
                setPermissionFormData({
                  ...permissionFormData,
                  sortValue: val as number,
                })
              }
            />
          </Item>
          <Item label="状态">
            <RadioGroup
              value={permissionFormData?.status}
              options={[
                { value: 1, label: '正常' },
                { value: 0, label: '停用' },
              ]}
              onChange={(e) =>
                setPermissionFormData({
                  ...permissionFormData,
                  status: e.target.value,
                })
              }
            />
          </Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Permission
