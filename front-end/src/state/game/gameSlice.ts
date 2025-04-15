import { createSlice } from "@reduxjs/toolkit/react";

interface GameState {
  playing: boolean;
  won: boolean;
  score: number;
}

const initialState: GameState = {
  playing: true,
  won: false,
  score: 0
};


const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    endGame: (state) => {
      state.playing = false;
    },
    playAgain: (state) => {
      state.playing = true;
    },
    winGame: (state) => {
      state.won = true;
    },
    getPoint: (state) => {
      state.score += 1;
    }

  }
});

export const { endGame, playAgain, winGame, getPoint } = gameSlice.actions;

export default gameSlice.reducer;
