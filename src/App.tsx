import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import router from '@/router'
import redux from '@/store'

const App = () => {
  return (
    <Provider store={redux}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
