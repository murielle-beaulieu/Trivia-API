import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

interface Settings {
  difficulty: string;
  category: string;
}

const initialState: Settings = {
    difficulty: "medium",
    category: "9"
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    defineSettings: (state, action: PayloadAction<Settings>) => {
      state.category = (action.payload.category);
      state.difficulty = (action.payload.difficulty);
    },

  }
});

export const { defineSettings } = settingsSlice.actions;

export default settingsSlice.reducer;