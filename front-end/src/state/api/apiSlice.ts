import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseAuthQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const apiSlice = createApi({
    baseQuery: baseAuthQuery,
    endpoints: () => ({})
})

