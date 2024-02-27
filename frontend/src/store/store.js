import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

// configuring all the reducers thats are created
export const store = configureStore({
    reducer: {
        user: userReducer
    },
})