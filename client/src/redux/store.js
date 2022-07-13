import { configureStore } from '@reduxjs/toolkit'
import { todosApiSlice } from './services/todos'
import { userApiSlice } from './services/user'

export const store = configureStore({
    reducer: {
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [todosApiSlice.reducerPath]: todosApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([
            todosApiSlice.middleware,
            userApiSlice.middleware
        ])
})