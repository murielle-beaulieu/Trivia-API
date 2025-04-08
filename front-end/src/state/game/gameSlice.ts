import { createSlice } from "@reduxjs/toolkit/react";

interface GameState {
  value: boolean;
}

const initialState: GameState = {
  value: true,
};

// we use the game state to keep track of if it's still ongoing
// on answering a question wrong, we can change this state and then submit the quiz result

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    endGame: (state) => {
      state.value = false;
    },
    playAgain: (state) => {
      state.value = true;
    }
  }
});

export const { endGame, playAgain } = gameSlice.actions;

export default gameSlice.reducer;
