import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../api/apiSlice';

export interface Quiz {
    userId: number
    id?: number
    score: number
    has_won: boolean
    difficulty: string
    questions: QuizQuestion[]
}

export interface QuizQuestion {
    quiz_id?: number
    // quizzes: Quiz[]
    title: string | undefined
    given_answer: string
    is_correct: boolean
}


// export const authApiSlice = apiSlice.injectEndpoints({
//     endpoints: builder => ({
//         login: builder.mutation({
//             query: credentials => ({
//                 url: '/auth/login',
//                 method: 'POST',
//                 body: { ...credentials }
//             }),
//         }),
//         getCurrentUser: builder.query ({
//             query: () => ({
//                 url: '/users/me',
//                 method: 'GET',

export const quizzesApiSlice = apiSlice.injectEndpoints({
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/quizzes" }),
    // reducerPath: "quizzesApi",
    // tagTypes: ["Quizzes"],
    endpoints: build => ({
        getQuizzes: build.query<Quiz[], void>({
        query: () => "",    
        }),
        getQuizById: build.query<number, Quiz>({
            query: (id) => `/${id}`,
        }),
        addQuiz: build.mutation<Quiz, Quiz>({
            query: newQuiz => ({
              url: "/quizzes",
              method: 'POST',
              body: newQuiz
            })
          })
    }),
})

export const { useGetQuizzesQuery, useAddQuizMutation, useGetQuizByIdQuery } = quizzesApiSlice;