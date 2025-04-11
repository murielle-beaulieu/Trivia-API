import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Quiz {
    userId: number
    id?: number
    score: number
    has_won: boolean
    difficulty: string
    questions: QuizQuestion[]
}

export interface QuizQuestion {
    // quiz_id: number
    // quizzes: Quiz[]
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
        addQuiz: build.mutation<Quiz, Quiz>({
            query: newQuiz => ({
              url: "http://localhost:8080/quizzes",
              method: 'POST',
              body: newQuiz
            })
          })
    }),
})

export const { useGetQuizzesQuery, useAddQuizMutation } = quizzesApiSlice;