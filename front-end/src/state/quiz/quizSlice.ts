import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Quiz {
    userId: number
    score: number
    has_won: boolean
    difficulty: string
    questions: QuizQuestion[]
}

interface QuizQuestion {
    quiz_id: number
    quizzes: Quiz[]
    title: string
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
    }),
})

export const { useGetQuizzesQuery } = quizzesApiSlice;