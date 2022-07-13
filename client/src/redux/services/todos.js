import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todosApiSlice = createApi({
    reducerPath: 'todos',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['Todo'],
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => '/todos',
            providesTags: ['Todo']
        }),
        addNewTodo: builder.mutation({
            query: newTodo => ({
                url: '/todos',
                method: 'POST',
                body: newTodo
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo']
        }),
        updateTodo: builder.mutation({
            query: ({ id, updatedTodo }) => ({
                url: `/todos/${id}`,
                method: 'PATCH',
                body: updatedTodo
            }),
            invalidatesTags: ['Todo']
        }),
    })
})

export const {
    useGetTodosQuery,
    useAddNewTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} = todosApiSlice