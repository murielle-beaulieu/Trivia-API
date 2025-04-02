// "results": [
//     {
//         "type": "multiple",
//         "difficulty": "medium",
//         "category": "Sports",
//         "question": "Which car manufacturer won the 2017 24 Hours of Le Mans?",
//         "correct_answer": "Porsche",
//         "incorrect_answers": [
//             "Toyota",
//             "Audi",
//             "Chevrolet"
//         ]
//     },


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


interface TriviaQuestion {
    type: string
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

interface TriviaApiResponse {
    results: TriviaQuestion[]
}

// Category Query - from 9 through 32
// https://opentdb.com/api_category.php

// Base query
// https://opentdb.com/api.php?amount=10

// Query with additional parameters
// https://opentdb.com/api.php?amount=19&category=13&difficulty=hard&type=multiple

export const triviaApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://opentdb.com/api.php" }),
    reducerPath: "triviaApi",
    tagTypes: ["Questions"],
    endpoints: build => ({
        getQuestions: build.query<TriviaApiResponse, number>({
            query: (amount = 10, category = 24, difficulty = 'hard',type = 'multiple') => `?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`,
            providesTags: (result, error, id) => [{type: "Questions", id}]
        }),
    }),
})

export const { useGetQuestionsQuery } = triviaApiSlice;