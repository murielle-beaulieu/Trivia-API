import { useDispatch, useSelector } from "react-redux";
import { useGetQuestionsQuery } from "./triviaSlice";
import { AppDispatch, RootState } from "../store";
import styles from "./trivia.module.scss";
import { increment, reset } from "../counter/counterSlice";
import { useState } from "react";
import { useGetQuizzesQuery, useAddQuizMutation } from "../quiz/quizSlice";
import { endGame, playAgain } from "../game/gameSlice";
import { addQuestion, clearQuestions } from "../result/resultSlice";
import "he";
import he from "he";
import { useNavigate } from "react-router-dom";

export const Trivia = () => {

  const navigate = useNavigate();

  // trivia

  const set = useSelector((state: RootState) => state.settings);
  console.log(set.category + " " + set.difficulty);

  const {
    data: triviaData,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useGetQuestionsQuery({category: set.category,difficulty: set.difficulty});

  const [addQuizMutation] = useAddQuizMutation();

  /* quizzes */
  // const { data: quizData } = useGetQuizzesQuery();
  // console.log(quizData);

  // counter 
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  // game
  const game = useSelector((state: RootState) => state.game.value);

  // result
  const result = useSelector((state: RootState) => state.result.questions);
  console.log(result);

  const currentQuestion = triviaData?.results[count];
  const correct_answer = currentQuestion?.correct_answer || "";
  const incorrect_answers = currentQuestion?.incorrect_answers || [];
  const all_answers = [...incorrect_answers];

  const randomIndex = Math.floor(4 * Math.random());
  all_answers.splice(randomIndex, 0, correct_answer);

  function checkAnswer(answer: string) {
    // we want to keep track of the quiz question and answer provided - good or bad
    if (answer == correct_answer) {
      console.log("right answer");
      dispatch(addQuestion({title: currentQuestion?.question, given_answer: correct_answer, is_correct: true}));
      console.log(result);
      dispatch(increment());
    } else {
      console.log("wrong answer");
      dispatch(addQuestion({title: currentQuestion?.question, given_answer: correct_answer, is_correct: false}));
      dispatch(endGame());
      console.log("game state: " + game);
    }
  }

  function restart() {
    // here we need to do a few things

    // - we want to submit the quiz we just played to the db
    // submitQuiz();
    // - we want to reset the quiz data
    dispatch(clearQuestions());
    // - we want to reset the counter
    dispatch(reset());
    // - we want to refetch for a new trivia quiz
    refetch();
    // - we want to change the game state to true
    dispatch(playAgain());
    navigate("/");
  }

  // async function submitQuiz() {
  //   try {
  //     await addQuizMutation({
  //       userId: 1,
  //       score: 0,
  //       has_won: false,
  //       difficulty: "EASY",
  //       questions: result
  //     }).unwrap()
  //     console.log("fucking fuck yea")
  //   } catch (e) {
  //     console.log(e + " error posting the quiz");
  //   }
  // }

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
            <h3>{currentQuestion && he.decode(currentQuestion.question)}</h3>
          </div>
          <div className={styles.question_answers}>
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
