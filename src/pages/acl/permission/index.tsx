import React, { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Radio,
  Table,
  TableProps,
} from 'antd'
import { getAllPermissionApi } from '@/apis/permissionApi.tsx'
import type { PermissionType } from '@/types/acl'
import {
  addPermissionApi,
  updatePermissionApi,
  deletePermissionApi,
} from '@/apis/permissionApi.tsx'

const { Item } = Form
const { Group: RadioGroup } = Radio

const Permission: React.FC = () => {
  // 权限列表
  const [permissionList, setPermissionList] = useState<PermissionType[]>([])
  // 菜单模态框的状态
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 菜单表单数据
  const [permissionFormData, setPermissionFormData] = useState<PermissionType>(
    {} as PermissionType,
  )

  const permissionColumns = useMemo<TableProps<PermissionType>['columns']>(
    () => [
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
        width: 300,
        minWidth: 300,
        render: (_, record) => (
          <>
            <Button
              type="link"
              style={{ color: 'var(--color-add)' }}
              onClick={() => openAddChildModal(record.id)}
            >
              新增子菜单
            </Button>
            <Button
              type="link"
              onClick={() => openUpdatePermissionModal(record)}
            >
              编辑
            </Button>
            <Popconfirm
              title="确认删除?"
              description="删除后将无法恢复!"
              onConfirm={() => handleDeletePermission(record.id)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ],
    [],
  )

  const isEditMode = useMemo(() => {
    return permissionFormData.id !== undefined
  }, [permissionFormData])

  const isAddRootMode = useMemo(() => {
    return !isEditMode && !permissionFormData.parentId
  }, [isEditMode, permissionFormData])

  const modalTitle = useMemo(() => {
    return isEditMode ? '编辑菜单' : isAddRootMode ? '新增菜单' : '新增子菜单'
  }, [isEditMode, isAddRootMode])

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

  // add permission
  const addPermission = async () => {
    const {
      data: { code },
    } = await addPermissionApi(permissionFormData)
    if (code === 200) {
      // notification
      message.success('新增权限成功')
      // reset form data
      setPermissionFormData({} as PermissionType)
      // 关闭模态框
      setIsModalOpen(false)
      // 刷新权限列表
      getPermissionList().then()
    }
  }

  // 表单提交
  const handleSubmit = () => {
    if (isEditMode) {
      // update permission
      editPermission().then()
    } else {
      // add permission
      /*setIsModalOpen(false)*/
      addPermission().then()
    }
  }

  // close modal
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // open modal
  const openAddModal = () => {
    setPermissionFormData({ parentId: 0 } as PermissionType)
    setIsModalOpen(true)
  }

  // open update modal
  const openUpdatePermissionModal = (menu: PermissionType) => {
    // callback permission data
    setPermissionFormData(menu)
    // open modal
    setIsModalOpen(true)
  }

  // update permission
  const editPermission = async () => {
    const {
      data: { code },
    } = await updatePermissionApi(permissionFormData)
    if (code === 200) {
      // message
      message.success('更新权限成功')
      // reset form data
      setPermissionFormData({} as PermissionType)
      // close modal
      setIsModalOpen(false)
      // refresh permission list
      getPermissionList().then()
    }
  }

  // open add child permission
  const openAddChildModal = (parentId: number) => {
    // set parent id
    setPermissionFormData({ parentId } as PermissionType)
    // open modal
    setIsModalOpen(true)
  }

  // confirm delete permission
  const handleDeletePermission = async (permissionId: number) => {
    const {
      data: { code },
    } = await deletePermissionApi(permissionId)
    if (code === 200) {
      // message
      message.success('删除权限成功')
      // refresh permission list
      getPermissionList().then()
    }
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
        rowKey={(record) => record.id}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: 700,
        }}
      />
      {/* permission modal */}
      <Modal
        title={modalTitle}
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
