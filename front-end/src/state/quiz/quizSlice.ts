import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    title: string | undefined
    given_answer: string
    is_correct: boolean
}

export const quizzesApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/quizzes" }),
    reducerPath: "quizzesApi",
    tagTypes: ["Quizzes"],
    endpoints: build => ({
        getQuizzes: build.query<Quiz[], void>({
        query: () => "",    
        }),
        getQuizById: build.query<number, Quiz>({
            query: (id) => `/${id}`,
        }),
        addQuiz: build.mutation<Quiz, Quiz>({
            query: newQuiz => ({
              url: "",
              method: 'POST',
              body: newQuiz
            })
          })
    }),
})

export const { useGetQuizzesQuery, useAddQuizMutation, useGetQuizByIdQuery } = quizzesApiSlice;