import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import { triviaApiSlice, triviaCategorySlice } from "./trivia/triviaSlice";

// create the store
export const store = configureStore({
    reducer: {
        // you can have as many slice as you want
        // each slice is responsible for it's own state

        //counter 
        counter: counterReducer,

        // trivia api
        [triviaApiSlice.reducerPath]: triviaApiSlice.reducer,

        // categories
        [triviaCategorySlice.reducerPath]: triviaCategorySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware().concat(triviaApiSlice.middleware),
         getDefaultMiddleware().concat(triviaCategorySlice.middleware, triviaApiSlice.middleware),

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

