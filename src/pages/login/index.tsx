import React, { useState } from 'react'
import { Form, Input, Button, Divider } from 'antd'
import {
  QqOutlined,
  WechatOutlined,
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MessageOutlined,
} from '@ant-design/icons'

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

  // 短信登录字段申明
  interface SmsFormProps {
    mobile?: string
    captcha?: string
  }

  // 密码登录字段申明
  interface LoginFormProps {
    username?: string
    password?: string
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
            {isPwdLogin && (
              <Form
                className="form-content-bypwd"
                name="login-form"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
              >
                <Item<LoginFormProps> label="账号" name="username">
                  <Input prefix={<UserOutlined />} placeholder="账号" />
                </Item>
                <Item<LoginFormProps> label="密码" name="password">
                  <Password prefix={<LockOutlined />} placeholder="密码" />
                </Item>
                <Item wrapperCol={{ span: 16, offset: 4 }}>
                  <div className="btn-grp">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      shape="round"
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
