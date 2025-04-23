import { useDispatch, useSelector } from "react-redux";
import { useGetQuestionsQuery } from "../../state/trivia/triviaSlice";
import { AppDispatch, RootState } from "../../state/store";
import styles from "./trivia.module.scss";
import { increment, reset } from "../../state/counter/counterSlice";
import {
  endGame,
  playAgain,
  winGame,
  getPoint,
} from "../../state/game/gameSlice";
import { addQuestion, clearQuestions } from "../../state/result/resultSlice";
import { useNavigate } from "react-router-dom";
import { useAddQuizMutation } from "../../state/quiz/quizSlice";
import he from "he";
import { useGetCurrentUserQuery } from "../../state/auth/authApiSlice";
import NavBar from "../NavBar/NavBar";

export const Trivia = () => {
  const navigate = useNavigate();

  const settings = useSelector((state: RootState) => state.settings);
  console.log(settings.category + " " + settings.difficulty);

  const {
    data: triviaData,
    isError,
    isLoading,
    isSuccess,
  } = useGetQuestionsQuery({
    category: settings.category,
    difficulty: settings.difficulty,
  });

  const [addQuizMutation] = useAddQuizMutation();

  // counter
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  // game
  const isPlaying = useSelector((state: RootState) => state.game.playing);
  console.log(isPlaying + " is playing");

  // win
  const win = useSelector((state: RootState) => state.game.won);
  console.log("winning? " + win);

  // result
  const result = useSelector((state: RootState) => state.result.questions);
  console.log(result);

  // score
  const gameScore = useSelector((state: RootState) => state.game.score);
  console.log(gameScore);

  const { data: currentUser } = useGetCurrentUserQuery({});
  const currentUserId = currentUser.id;

  async function submitQuiz() {
    try {
      await addQuizMutation({
        userId: currentUserId,
        score: 0,
        has_won: false,
        difficulty: settings.difficulty.toUpperCase(),
        questions: result,
      }).unwrap();
      console.log("submitted quiz")
    } catch (e) {
      console.log(e + " error posting the quiz");
    }
  }

  //question count
  const countQuestion = gameScore + 1;

  const currentQuestion = triviaData?.results[count];
  const correct_answer = currentQuestion?.correct_answer || "";
  const incorrect_answers = currentQuestion?.incorrect_answers || [];
  const all_answers = [...incorrect_answers];

  const randomIndex = Math.floor(4 * Math.random());
  all_answers.splice(randomIndex, 0, correct_answer);

  function checkAnswer(answer: string) {
    // we want to keep track of the quiz question and answer provided - good or bad
    if (answer == correct_answer) {
      dispatch(getPoint());
      console.log("right answer");
      dispatch(
        addQuestion({
          title: currentQuestion?.question,
          given_answer: correct_answer,
          is_correct: true,
        })
      );
      console.log(result);
      dispatch(increment());
    } else {
      console.log("wrong answer: " + answer);
      dispatch(
        addQuestion({
          title: currentQuestion?.question,
          given_answer: answer,
          is_correct: false,
        })
      );
      dispatch(endGame());
      console.log("game state: " + isPlaying);
    }
  }

  function restart() {
    submitQuiz().then(() => {
      dispatch(clearQuestions());
      dispatch(reset());
      dispatch(playAgain());
      
      setTimeout(() => {
        navigate("/settings");
      }, 0);
    });
  }


  function endGameToUserPage() {
    submitQuiz().then(() => {
      dispatch(clearQuestions());
      dispatch(reset());    
      dispatch(playAgain());
      console.log("game state after endgame to user: " + isPlaying);
      navigate("/user");
    })
  }

  if (gameScore == 10) {
    console.log("YOU WON!");
    dispatch(winGame());
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

  if (win) {
    return (
      <>
       <NavBar>
        <h2>Great work!</h2>
       </NavBar>
        <h1>🎉🎉 CONGRATS YOU WON!  🎉🎉</h1>
        <button className={styles.play} onClick={() => restart()}>
          Play again?
        </button>
        <button className={styles.play} onClick={() => endGameToUserPage()}>
          Go to profile
        </button>
      </>
    );
  }

  if (isSuccess && isPlaying) {
    return (
      <>
        <NavBar>
          <h2>Score: {gameScore}/10</h2>
        </NavBar>
        <article className={styles.question_card}>
          <section className={styles.question_header}>
            <h2>Question # {countQuestion}</h2>
          </section>
          <section className={styles.question_title}>
            <h3>{currentQuestion && he.decode(currentQuestion.question)}</h3>
          </section>
          <section className={styles.question_answers}>
            {all_answers.map((answer) => (
              <button key={answer} onClick={() => checkAnswer(answer)}>
                {he.decode(answer)}
              </button>
            ))}
          </section>
        </article>
      </>
    );
  }

if (!isPlaying) {
  return (
    <>
    <NavBar>
      <h2>Better luck next time!</h2>
    </NavBar>
    <div className={styles.gameEnd}>
      <h2>Nice try! Your finishing score is {gameScore}/10</h2>
      <button className={styles.play} onClick={restart}>
        Play Again
      </button>
      <button className={styles.play} onClick={endGameToUserPage}>
        Go to Profile
      </button>
    </div>
    </>
  );
}

  return null;
};