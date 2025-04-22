import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

export enum SessionType {
  GUEST = 'guest',
  USER = 'user'
}

interface GameState {
  playing: boolean;
  won: boolean;
  score: number;
  sessionType: SessionType | null;
}

const initialState: GameState = {
  playing: true,
  won: false,
  score: 0,
  sessionType: null,
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
    },
    setSessionType : (state, action: PayloadAction<SessionType>) => {
      state.sessionType = action.payload;
    }
  }
});

export const { endGame, playAgain, winGame, getPoint, setSessionType } = gameSlice.actions;

export default gameSlice.reducer;
