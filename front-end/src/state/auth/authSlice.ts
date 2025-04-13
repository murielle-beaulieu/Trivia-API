// import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// // interface User {
// //     id: number
// //     firstName: string
// //     email: string
// // }

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: { user: null, token: null },
//     reducers: {
//         setCredentials: (state, action) => {
//             const { user, accessToken } = action.payload
//             state.user = user
//             state.token = accessToken
//         },
//         logOut: (state, action) => {
//             state.user = null
//             state.token = null
//         }
//     },
// })

// export const { setCredentials, logOut } = authSlice.actions

// export default authSlice.reducer

// export const selectCurrentUser = (state: { user: any }) => state.user;
// export const selectCurrentToken = (state) => state.auth.token

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Assuming you have a store file defining RootState

// Define interfaces for our state and payload
interface AuthState {
  user: User | null;
  token: string | null;
}

interface User {
  // Add user properties based on your application needs
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add other user properties here
}

interface CredentialsPayload {
  user: User;
  accessToken: string;
}

const initialState: AuthState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    }
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// Typed selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;