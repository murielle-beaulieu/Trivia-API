import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface TriviaQuestion {
    type: string
    difficulty: string
    category: TriviaCategory
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

interface TriviaApiResponse {
    results: TriviaQuestion[]
}

interface TriviaCategory {
    id: number
    name: string
}

interface TriviaCategoriesResponse {
    trivia_categories: TriviaCategory[]
}

interface TriviaOptions {
    category: string;
    difficulty: string;
    amount?: number;
    type?: string;
}


export const triviaCategorySlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://opentdb.com/api_category.php" }),
    reducerPath: "triviaCategories",
    tagTypes: ["Categories"],
    endpoints: build => ({
        getCategories: build.query<TriviaCategoriesResponse, void>({
        query: () => "",
        }),
    }),
})


export const triviaApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://opentdb.com/api.php" }),
    reducerPath: "triviaApi",
    tagTypes: ["Questions"],
    endpoints: build => ({
        getQuestions: build.query<TriviaApiResponse, TriviaOptions>({
            query: (options: TriviaOptions) => {
                const {category = options.category, difficulty= options.difficulty, amount = 10, type= "multiple" } = options;
                console.log(options.category, options.difficulty);
                const queryString = `?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
                console.log('Query URL:', queryString);
                return queryString;
            },
            providesTags: (result, error, id) => [{type: "Questions", id: JSON.stringify(id)}]
        }),
    }),
})

export const { useGetQuestionsQuery } = triviaApiSlice;
export const { useGetCategoriesQuery } = triviaCategorySlice;