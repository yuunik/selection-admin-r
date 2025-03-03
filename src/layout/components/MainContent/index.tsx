import { CSSTransition } from 'react-transition-group'
import { Outlet } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import store from '@/store'

const MainContent = () => {
  const [inProp, setInProp] = useState(false)
  const nodeRef = useRef(null)

  useEffect(() => {
    setInProp(true)
    return () => setInProp(false)
  }, [])

  // 获取二级路由的key
  const { key } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.layoutSettingReducer,
  )

  // 当key变化时触发动画
  useEffect(() => {
    // key变化时先关闭动画
    setInProp(false)
    // 延迟50ms重新打开动画确保过渡效果
    const timer = setTimeout(() => setInProp(true), 50)
    return () => clearTimeout(timer)
  }, [key]) // 添加key到依赖数组

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={inProp}
      timeout={300}
      classNames="fade"
      unmountOnExit
      appear
    >
      <div ref={nodeRef}>
        <Outlet />
      </div>
    </CSSTransition>
  )
}

export default MainContent
