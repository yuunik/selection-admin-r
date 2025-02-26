import { useNavigate } from 'react-router-dom'

/**
 * 主页重定向工具
 */
const useRedirect = () => {
  const navigate = useNavigate()

  return (pathname: string) => {
    switch (pathname) {
      case '/':
        navigate('/home')
        break
      case '/acl':
        navigate('/acl/user')
        break
      case '/prod':
        navigate('/prod/trademark')
        break
      default:
        // 不进行任何操作
        break
    }
  }
}

export default useRedirect
