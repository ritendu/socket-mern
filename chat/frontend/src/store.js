import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/authSlice'
import getUsersReducer from './features/user/userSlice'

export const store = configureStore({
    reducer:{
        user:userReducer,
        getUser:getUsersReducer
    }
})