import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'
import {
  fetchUserInfo,
  saveMenuRoutes,
  fetchLogout,
} from '@/store/modules/user'
import constantRoutes from '@/router/routes'
import settings from '@/settings'
import useMeta from '@/hooks/useMeta.tsx'

/**
 * 路由鉴权组件所接收的参数类型
 */
interface AuthRouteProps {
  component: React.FunctionComponent // 声明接收单个React元素
}

// 取消进度圆圈动画
NProgress.configure({ showSpinner: false })

const AuthRoute: React.FC<AuthRouteProps> = ({ component }) => {
  const AuthComponent = memo(component)
  // 增加加载状态
  // const [isChecking, setIsChecking] = useState(true)
  // 获取 token 和 用户信息
  const { token, userInfo, menuRoutes } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.userReducer,
  )
  // 获取触发对象
  const dispatch = useDispatch<typeof store.dispatch>()
  // 获取当前路径对象
  const location = useLocation()
  // 获取路由跳转方法
  const navigate = useNavigate()
  // 获取当前matches信息
  const matches = useMatches()
  // 获取当前路径
  const pathnameArr = useMemo(
    () => matches.map((match) => match.pathname),
    [matches],
  )

  // 路由鉴权
  useEffect(() => {
    const checkAuth = async () => {
      // 显示进度条
      NProgress.start()
      try {
        if (token) {
          // 登录状态下, 不能访问登录页面, 跳转首页
          if (location.pathname === '/login') {
            message.info('您已登录, 正在跳转首页')
            navigate('/')
          }
          // 用户信息为空则获取用户信息
          if (!Object.keys(userInfo).length) {
            try {
              // 获取用户信息
              await dispatch(fetchUserInfo())
            } catch (error) {
              // 清空用户信息
              await dispatch(fetchLogout())
              // token 失效, 跳转登录页面
              message.error((error as Error).message)
              navigate('/login')
            }
          }
        } else {
          if (location.pathname !== '/login') {
            message.warning('请先登录')
            navigate(`/login?redirect=${location.pathname}`)
          }
        }
      } catch (error) {
        // token 失效, 跳转登录页面
        message.error((error as Error).message)
        // 清空用户信息
        dispatch(fetchUserInfo())
        navigate(`/login?redirect=${location.pathname}`)
      } finally {
        //setIsChecking(false)
        NProgress.done()
      }
    }
    checkAuth()
  }, [location.pathname])

  // 组件渲染完成后, 保存菜单路由
  useEffect(() => {
    // 保存菜单路由
    dispatch(saveMenuRoutes(constantRoutes))
  }, [])

  // 获取页面元信息
  const meta = useMeta(pathnameArr)
  // 页面标题设置
  useEffect(() => {
    if (menuRoutes.length !== 0) {
      // 菜单路由存在, 则设置页面标题
      // 获取配置信息
      const { websiteTitle } = settings
      // 设置网页标题
      document.title = `${websiteTitle}/${meta[1].title}`
    }
  }, [menuRoutes])

  // if (isChecking) return <div>Loading...</div> // 显示加载动画

  // 登录状态下, 且有用户信息, 则渲染页面
  if (token && userInfo?.name && location.pathname !== '/login') {
    return <AuthComponent />
  }

  if (!token && location.pathname === '/login') {
    return <AuthComponent />
  }
}

export default AuthRoute
