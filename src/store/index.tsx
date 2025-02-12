import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'

const redux = configureStore({
  reducer: {
    userReducer,
  },
})

export default redux
