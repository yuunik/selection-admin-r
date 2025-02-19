import { CSSTransition } from 'react-transition-group'
import { Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import './index.scss'

const MainContent = () => {
  const nodeRef = useRef(null)
  const [inProp, setInProps] = useState(false)

  // 页面切换动画
  useEffect(() => {
    setInProps(true)
  }, [])

  // 页面切换动画结束
  useEffect(() => {
    return () => {
      setInProps(false)
    }
  }, [])

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={inProp}
      timeout={200}
      classNames="fade"
    >
      <Outlet />
    </CSSTransition>
  )
}

export default MainContent
