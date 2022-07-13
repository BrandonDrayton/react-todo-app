import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userApiSlice = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/users' }),
    tagTypes: ["User"],
    endpoints: builder => ({
        getCurrentUser: builder.query({
            query: () => ({
                url: '/current'
            }),
            providesTags: ['User']
        }),
        login: builder.mutation({
            query: userDetails => ({
                url: '/login',
                method: 'POST',
                body: userDetails
            }),
            invalidatesTags: ['User']
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetCurrentUserQuery
} = userApiSlice