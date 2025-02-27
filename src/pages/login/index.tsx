import React, { useEffect, useState } from 'react'
import { FormProps, Image, message } from 'antd'
import { Form, Input, Button, Divider } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  QqOutlined,
  WechatOutlined,
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import NProgress from 'nprogress'

import { generateCaptchaApi } from '@/apis/loginApi.tsx'
import store from '@/store'
import { fetchLogin } from '@/store/modules/user'

import './index.scss'
import Left from '@/assets/login_left.png'
import Logo from '@/assets/logo.png'

const Login: React.FC = () => {
  const Item = Form.Item
  const Password = Input.Password
  // 是否为密码登录
  const [isPwdLogin, setIsPwdLogin] = useState(true)
  // 是否为注册模式
  const [isRegister, setIsRegister] = useState(false)
  // 倒计时
  const [count, setCount] = useState(60)
  // 是否点击获取验证码
  const [isSendSms, setIsSendSms] = useState(false)
  // 验证码key
  const [codeKey, setCodeKey] = useState('')
  // 验证码value
  const [codeValue, setCodeValue] = useState('')
  // 获取 dispatch
  const dispatch = useDispatch<typeof store.dispatch>()
  // 获取导航
  const navigate = useNavigate()
  // 密码错误次数
  const [pwdErrorCount, setPwdErrorCount] = useState(0)
  // 设置按钮载入状态
  const [loading, setLoading] = useState(false)

  // 短信登录字段申明
  interface SmsFormProps {
    mobile?: string
    captcha?: string
  }

  // 密码登录字段申明
  interface LoginFormProps {
    userName: string
    password: string
    captcha?: string
  }

  // 立即注册
  const handleRegister = () => {
    // 切换到短信登录
    setIsPwdLogin(false)
    // 切换到注册模式
    setIsRegister(true)
  }

  // 发送短信验证码
  const handleSendSms = () => {
    // 发送短信验证码
    setIsSendSms(true)
    // 倒计时
    countDown()
  }

  // 倒计时
  const countDown = () => {
    const timer = setInterval(() => {
      setCount((prevState) => {
        if (prevState === 1) {
          // 清除定时器
          clearInterval(timer)
          // 发送短信验证码结束
          setIsSendSms(false)
          return 60
        } else {
          return prevState - 1
        }
      })
    }, 1000)
  }

  const [search] = useSearchParams()
  const hadRedirect = search.get('redirect')
  // 用户登录
  const handleLogin: FormProps<LoginFormProps>['onFinish'] = async (values) => {
    try {
      // 按钮载入状态
      setLoading(true)
      // 发送登录请求
      await dispatch(
        fetchLogin({
          userName: values.userName,
          password: values.password,
          captcha: values.captcha as string,
          codeKey: codeKey,
        }),
      )
      // 按钮载入状态
      setLoading(false)
      // 登录成功
      message.success('登录成功')
      // 路由跳转
      navigate(hadRedirect ? hadRedirect : '/')
    } catch (error) {
      // 按钮载入状态
      setLoading(false)
      const errMsg = (error as Error).message
      // 登录失败
      message.error(errMsg)
      if (errMsg === '用户名或者密码错误') {
        // 密码错误次数加1
        setPwdErrorCount(pwdErrorCount + 1)
      }
    }
  }

  // 生成验证码
  const generateCaptcha = async () => {
    const {
      data: {
        code,
        data: { codeKey, codeValue },
      },
    } = await generateCaptchaApi()
    if (code === 200) {
      // 设置验证码key和value
      setCodeKey(codeKey)
      setCodeValue(codeValue)
    }
  }

  useEffect(() => {
    if (pwdErrorCount > 3) {
      generateCaptcha()
    }
  }, [pwdErrorCount])

  useEffect(() => {
    if (NProgress.isStarted()) {
      NProgress.done()
    }
  }, [])

  return (
    <div className="bg">
      <div className="login-container">
        <img src={Left} alt="login-login" className="login-img" />
        <div className="form-container">
          <div className="login-form">
            <strong className="form-title">
              <img src={Logo} alt="login-logo" className="login-logo" />
              <span className="form-title-text">Selection-Admin</span>
            </strong>
            <nav className="login-method">
              <span
                className="bycaptcha"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsPwdLogin(false)}
              >
                短信登录
              </span>
              <Divider type="vertical" />
              <span
                className="bypwd"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsPwdLogin(true)}
              >
                密码登录
              </span>
            </nav>
            {/* 密码登录表单 */}
            {isPwdLogin && (
              <Form
                className="form-content-bypwd"
                name="login-form"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
                onFinish={handleLogin}
              >
                <Item<LoginFormProps>
                  label="账号"
                  name="userName"
                  rules={[{ required: true, message: '请输入账号' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="请输入账号" />
                </Item>
                <Item<LoginFormProps>
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Password
                    prefix={<LockOutlined />}
                    placeholder="请输入密码"
                  />
                </Item>
                <Item<LoginFormProps>
                  label="验证码"
                  name="captcha"
                  style={{
                    display: pwdErrorCount > 3 ? 'block' : 'none',
                  }}
                  rules={[
                    { required: pwdErrorCount > 3, message: '请输入验证码' },
                  ]}
                >
                  <Input
                    prefix={<MessageOutlined />}
                    suffix={
                      <Image
                        src={codeValue}
                        preview={false}
                        onClick={generateCaptcha}
                        style={{ cursor: 'pointer' }}
                      />
                    }
                    placeholder="请输入验证码"
                  />
                </Item>
                <Item wrapperCol={{ span: 16, offset: 4 }}>
                  <div className="btn-grp">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      shape="round"
                      loading={loading}
                    >
                      登录
                    </Button>
                    <Button type="default" htmlType="reset" shape="round">
                      重置
                    </Button>
                  </div>
                </Item>
              </Form>
            )}
            {/* 短信登录表单 */}
            {!isPwdLogin && (
              <Form
                className="form-content-bycaptcha"
                name="login-form"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
              >
                <Item<SmsFormProps> label="手机号" name="mobile">
                  <Input prefix={<MobileOutlined />} placeholder="手机号" />
                </Item>
                <Item<SmsFormProps> label="验证码" name="captcha">
                  <Input
                    prefix={<MessageOutlined />}
                    suffix={
                      <Button
                        type="link"
                        onClick={handleSendSms}
                        disabled={isSendSms}
                      >
                        {isSendSms ? `${count}秒后重发` : '获取验证码'}
                      </Button>
                    }
                    placeholder="验证码"
                  />
                </Item>
                <Item wrapperCol={{ span: 16, offset: 4 }}>
                  <div className="btn-grp">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      shape="round"
                    >
                      {isRegister ? '注册' : '登录'}
                    </Button>
                    <Button type="default" htmlType="reset" shape="round">
                      重置
                    </Button>
                  </div>
                </Item>
              </Form>
            )}
            <div className="third-party-login">
              <Divider>第三方登录</Divider>
              <div className="icon-grp">
                <QqOutlined className="icon-qq" />
                <Divider type="vertical" />
                <WechatOutlined className="icon-wechat" />
              </div>
            </div>
            <Button
              type="link"
              className="register-link"
              onClick={handleRegister}
            >
              立即注册
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
