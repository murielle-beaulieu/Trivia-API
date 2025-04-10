import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { QuizQuestion } from "../quiz/quizSlice";
import { Difficulty } from "../trivia/triviaSlice";

interface ResultState {
    userId: number
    score: number | null
    has_won: boolean
    difficulty: Difficulty
    questions: QuizQuestion[]
}

const initialState: ResultState = {
  userId: 1,
  score: null,
  has_won: false,
  difficulty: Difficulty.EASY,
  questions: []
};

// we use the game state to keep track of if it's still ongoing
// on answering a question wrong, we can change this state and then submit the quiz result

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<QuizQuestion>) => {
      // where we initialize the questions
      state.questions.push(action.payload);
    },
    clearQuestions: (state) => {
      state.questions = []
    }
  }
});

export const { addQuestion, clearQuestions } = resultSlice.actions;

export default resultSlice.reducer;
