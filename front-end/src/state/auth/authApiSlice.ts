import { apiSlice } from "../api/apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
        getCurrentUser: builder.query ({
            query: () => ({
                url: '/users/me',
                method: 'GET',
              }),
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetCurrentUserQuery
} = authApiSlice