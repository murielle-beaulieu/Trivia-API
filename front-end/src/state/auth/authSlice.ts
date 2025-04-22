import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  user: User | null;
  token: string | null;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string
}

interface CredentialsPayload {
  token: string | null;
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
      const { token } = action.payload;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    }
  },
});


export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;