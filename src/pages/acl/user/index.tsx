import React, { useEffect, useMemo, useState } from 'react'
import { Button, DatePicker, Form, Input, message, Modal, Table } from 'antd'
import type { TableProps } from 'antd'
import { RedoOutlined, SearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import type { UserInfoType } from '@/types/login'
import type { PageParamsType } from '@/types'
import type { UserQueryType } from '@/types/acl'
import { pageUserListApi } from '@/apis/userApi.tsx'
import { addUserApi, deleteUserApi, editUserApi } from '@/apis/userApi.tsx'

// 表单项
const { Item } = Form
// 时间范围选择器
const { RangePicker } = DatePicker
const { TextArea, Password } = Input

const User: React.FC = () => {
  // 用户列表
  const [userList, setUserList] = useState<UserInfoType[]>([])

  // 用户列表列配置
  const columns = useMemo<TableProps<UserInfoType>['columns']>(
    () => [
      {
        title: '用户id',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: 100,
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        align: 'center',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
      },
      {
        title: '简介',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <>
            <Button type="link" onClick={() => openEditModal(record)}>
              编辑
            </Button>
            <Button
              type="link"
              danger
              className="ml-4"
              onClick={() => handleDeleteUser(record.id)}
            >
              删除
            </Button>
          </>
        ),
        align: 'center',
        width: 200,
      },
    ],
    [],
  )

  // 分页请求参数
  const [pageParams, setPageParams] = useState<PageParamsType>({
    pageNum: 1,
    pageSize: 5,
  })

  // 分页搜索数据
  const [searchParams, setSearchParams] = useState<UserQueryType>({
    keyword: '',
    createTimeBegin: '',
    createTimeEnd: '',
  })

  // 用户列表总数
  const [total, setTotal] = useState(0)

  // 提交的表单数据
  const [userFormData, setUserFormData] = useState<UserInfoType>(
    {} as UserInfoType,
  )

  // 获取用户列表
  const getUserList = async (pageNum = 1, searchParam = searchParams) => {
    // 默认查询第一页
    setPageParams({ ...pageParams, pageNum })
    // 发送请求
    const {
      data: {
        code,
        data: { list, total },
      },
    } = await pageUserListApi(
      pageParams.pageNum,
      pageParams.pageSize,
      searchParam,
    )
    if (code === 200) {
      // 请求成功
      // 设置用户列表
      setUserList(list.map((item) => ({ ...item, key: item.id })))
      // 设置用户列表总数
      setTotal(total)
    }
  }

  // 组件挂载完成后, 获取用户列表
  useEffect(() => {
    getUserList(pageParams.pageNum > 1 ? pageParams.pageNum : undefined)
  }, [pageParams.pageNum])

  // 日期范围变化
  const onDateChange = (datesString: string[]) => {
    setSearchParams({
      ...searchParams,
      createTimeBegin: datesString[0],
      createTimeEnd: datesString[1],
    })
  }

  // 用户名搜索
  const handleSearchUser = (values: any) => {
    const createTimeBegin = dayjs(values.createTime[0]).format('YYYY-MM-DD')
    const createTimeEnd = dayjs(values.createTime[1]).format('YYYY-MM-DD')
    // 重新渲染页面
    getUserList(1, {
      keyword: values.keyword,
      createTimeBegin,
      createTimeEnd,
    })
  }

  // 重置搜索条件
  const handleResetSearch = () => {
    const resetParams = {
      keyword: '',
      createTimeBegin: '',
      createTimeEnd: '',
    }
    // 重新渲染页面
    getUserList(1, resetParams)
    // 清空搜索条件
    setSearchParams(resetParams)
  }

  // 信息弹窗显隐
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 新增用户或编辑用户的表单提交
  const handleSubmit = () => {
    if (userFormData.id) {
      // 编辑用户
      handleEditUser()
    } else {
      // 新增用户
      handleAddUser()
    }
  }

  // 打开新增用户弹窗
  const openAddModal = () => {
    // 清空表单
    setUserFormData({
      userName: '',
      name: '',
      phone: '',
      description: '',
    } as UserInfoType)
    // 打开弹窗
    setIsModalOpen(true)
  }

  // 新增用户
  const handleAddUser = async () => {
    const {
      data: { code },
    } = await addUserApi(userFormData)
    if (code === 200) {
      // 新增成功
      message.success('新增成功')
      // 关闭弹窗
      setIsModalOpen(false)
      // 刷新用户列表
      getUserList()
    }
  }

  // 打开编辑用户弹窗
  const openEditModal = (record: UserInfoType) => {
    // 填充表单
    setUserFormData({ ...record })
    // 打开弹窗
    setIsModalOpen(true)
  }

  // 编辑用户
  const handleEditUser = async () => {
    const {
      data: { code },
    } = await editUserApi(userFormData)
    if (code === 200) {
      // 编辑成功
      message.success('编辑成功')
      // 关闭弹窗
      setIsModalOpen(false)
      // 刷新用户列表
      getUserList()
    }
  }

  // 删除用户
  const handleDeleteUser = async (id: number) => {
    Modal.confirm({
      title: '是否确认删除该用户?',
      content: '删除后将无法恢复，请谨慎操作！',
      onOk: async () => {
        const {
          data: { code },
        } = await deleteUserApi(id)
        if (code === 200) {
          // 删除成功
          message.success('删除成功')
          // 刷新用户列表
          getUserList()
        }
      },
      centered: true,
      maskClosable: false,
    })
  }

  return (
    <div>
      {/* 条件查询 */}
      <div className="shadow-default rounded-[4px] p-[20px]">
        <Form
          layout="inline"
          className="relative"
          onFinish={(values) => handleSearchUser(values)}
        >
          <Item<UserQueryType> name="keyword" label="用户名">
            <Input
              placeholder="请输入用户名"
              value={searchParams.keyword}
              onChange={(e) =>
                setSearchParams({ ...searchParams, keyword: e.target.value })
              }
            />
          </Item>
          <Item name="createTime" label="创建时间">
            <RangePicker
              onChange={(_, datesString) => onDateChange(datesString)}
            />
          </Item>
          <Item className="absolute top-0 right-4">
            <Button
              type="primary"
              style={{ marginRight: 12 }}
              icon={<SearchOutlined />}
              htmlType="submit"
            >
              搜索
            </Button>
            <Button
              type="default"
              htmlType="reset"
              onClick={handleResetSearch}
              icon={<RedoOutlined />}
            >
              重置
            </Button>
          </Item>
        </Form>
      </div>
      {/* 内容区 */}
      <div className="shadow-default mt-[20px] rounded-[4px] p-[20px]">
        {/* 新增按钮 */}
        <Button type="primary" onClick={openAddModal}>
          新增用户
        </Button>
        {/* 表格 */}
        <Table
          dataSource={userList}
          columns={columns}
          className="mt-[10px]"
          bordered
          pagination={{
            position: ['bottomRight'],
            current: pageParams.pageNum,
            pageSize: pageParams.pageSize,
            total: total,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: [1, 3, 5, 7, 9, 11],
            onChange: (pageNum, pageSize) =>
              setPageParams({ pageNum, pageSize }),
          }}
        />
      </div>
      {/* 用户信息弹窗 */}
      <Modal
        title={userFormData.id ? '编辑用户' : '新增用户'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        centered
        maskClosable={false}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Item label="用户名">
            <Input
              placeholder="请输入用户名"
              value={userFormData.userName}
              onChange={(e) =>
                setUserFormData({ ...userFormData, userName: e.target.value })
              }
            />
          </Item>
          <Item label="用户密码" className={userFormData.id ? 'hidden' : ''}>
            <Password
              placeholder="请输入用户密码"
              value={userFormData.password}
              onChange={(e) =>
                setUserFormData({ ...userFormData, password: e.target.value })
              }
            />
          </Item>
          <Item label="姓名">
            <Input
              placeholder="请输入姓名"
              value={userFormData.name}
              onChange={(e) =>
                setUserFormData({ ...userFormData, name: e.target.value })
              }
            />
          </Item>
          <Item label="手机号">
            <Input
              placeholder="请输入手机号"
              value={userFormData.phone}
              onChange={(e) =>
                setUserFormData({ ...userFormData, phone: e.target.value })
              }
            />
          </Item>
          <Item label="简介">
            <TextArea
              placeholder="请输入简介"
              value={userFormData.description}
              onChange={(e) =>
                setUserFormData({
                  ...userFormData,
                  description: e.target.value,
                })
              }
            />
          </Item>
        </Form>
      </Modal>
    </div>
  )
}

export default User
