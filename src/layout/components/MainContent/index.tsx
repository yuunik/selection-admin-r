import { Outlet } from 'react-router-dom'

import './index.scss'

const MainContent = () => {
  return (
    <div className="router-container">
      <Outlet />
    </div>
  )
}

export default MainContent
