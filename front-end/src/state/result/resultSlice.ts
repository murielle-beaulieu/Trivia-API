import { createSlice } from "@reduxjs/toolkit/react";

interface ResultState {
    userId: number
    score: number | null
    has_won: boolean
    difficulty: string
    questions: QuizQuestion[]
}

interface QuizQuestion {
    quiz_id: number
    quizzes: Quiz[]
    title: string
    given_answer: string
    is_correct: boolean
}

const initialState: ResultState = {
  userId: 1,
  score: null,
  has_won: false,
  difficulty: "EASY",
  questions: []
};

// we use the game state to keep track of if it's still ongoing
// on answering a question wrong, we can change this state and then submit the quiz result

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    createQuestion: (state, action) => {
      // where we initialize the questions
      question.userId = payload.userId;
      state.questions.push()
    }
  }
});

export const { createQuestion} = resultSlice.actions;

export default resultSlice.reducer;
