import Login from '@/pages/login'
import Layout from '@/layout/index'

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Layout />,
  },
]

export default routes
