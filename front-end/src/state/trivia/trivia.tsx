import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery, useGetQuestionsQuery } from "./triviaSlice";
import { AppDispatch, RootState } from "../store";
import styles from "./trivia.module.scss";
import { increment, reset } from "../counter/counterSlice";
import { useState } from "react";
import { useGetQuizzesQuery } from "../quiz/quizSlice";
import { endGame, playAgain } from "../game/gameSlice";

export const Trivia = () => {
  // trivia
  const [category, setCategory] = useState(15);
  const {
    data: triviaData,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useGetQuestionsQuery(category);

//   interface Quiz {
//     userId: number
//     score: number
//     has_won: boolean
//     difficulty: string
//     questions: QuizQuestion[]
// }

// interface QuizQuestion {
//     quiz_id: number
//     quizzes: Quiz[]
//     title: string
//     given_answer: string
//     is_correct: boolean
// }

  /* categories */
  // const { data: categoriesData } = useGetCategoriesQuery();
  // console.log(categoriesData?.trivia_categories[0].name);

  /* quizzes */
  // const { data: quizData } = useGetQuizzesQuery();
  // console.log(quizData);

  // counter 
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  // game
  const game = useSelector((state: RootState) => state.game.value);

  const currentQuestion = triviaData?.results[count];
  const correct_answer = currentQuestion?.correct_answer || "";
  const incorrect_answers = currentQuestion?.incorrect_answers || [];
  const all_answers = [...incorrect_answers];

  const randomIndex = Math.floor(4 * Math.random());
  all_answers.splice(randomIndex, 0, correct_answer);

  function checkAnswer(answer: string) {
    // we want to keep track of the quiz question and answer provided - good or bad
    if (answer == correct_answer) {
      dispatch(increment());
      console.log("right answer");
    } else {
      console.log("wrong answer");
      dispatch(endGame());
      console.log("game state: " + game);
    }
  }

  function restart() {
    // here we need to do a few things
    // - we want to submit the quiz we just played to the db
    // - we want to reset the counter
    dispatch(reset());
    // - we want to refetch for a new trivia quiz
    refetch();
    // - we want to change the game state to true
    dispatch(playAgain());
  }

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isSuccess && game) {
    return (
      <>
        <h1>Trivia</h1>
        <div className={styles.question_card}>
          <div>
            <h3>{currentQuestion?.question}</h3>
          </div>
          <div>
            {all_answers.map((answer) => (
              <button key={answer} onClick={() => checkAnswer(answer)}>{answer}</button>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (!game) {
    return (
      <>
        <h2>Nice try! Your score is ...</h2>
        <button onClick={() => restart()}>Play again?</button>
      </>
    );
  }

  return null;
};
