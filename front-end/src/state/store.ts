import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./auth/authSlice";
import counterReducer from "./counter/counterSlice";
import gameReducer from "./game/gameSlice";
import resultReducer from "./result/resultSlice";
import settingsReducer from "./settings/settingsSlice";
import { triviaApiSlice, triviaCategorySlice } from "./trivia/triviaSlice";
import { quizzesApiSlice } from "./quiz/quizSlice";

// create the store
export const store = configureStore({
    reducer: {
        // you can have as many slice as you want
        // each slice is responsible for it's own state

        // auth
        auth: authReducer,

        // counter 
        counter: counterReducer,

        // game state
        game: gameReducer,

        // result
        result: resultReducer,

        // settings
        settings: settingsReducer,

        // auth api
        [apiSlice.reducerPath]: apiSlice.reducer,

        // trivia api
        [triviaApiSlice.reducerPath]: triviaApiSlice.reducer,

        // categories
        [triviaCategorySlice.reducerPath]: triviaCategorySlice.reducer,

        // quizzes
        [quizzesApiSlice.reducerPath]: quizzesApiSlice.reducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware().concat(triviaApiSlice.middleware),
         getDefaultMiddleware().concat( apiSlice.middleware, triviaCategorySlice.middleware, triviaApiSlice.middleware, quizzesApiSlice.middleware),

})

// export your types
export type RootState = ReturnType<typeof store.getState>;
// whenever we want to access the state using a selector,
// we're going to be able to define the state using this root state type
// and then we'll have access in ts to all of our states

export type AppDispatch = typeof store.dispatch;
// will become useful for the async actions

// React cannot talk directly to Redux, so we need to set up a provider
// then connect our store and app state to react

