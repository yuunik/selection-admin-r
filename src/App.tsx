import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { Provider } from 'react-redux'
import redux from '@/store'

const App = () => {
  return (
    <Provider store={redux}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
