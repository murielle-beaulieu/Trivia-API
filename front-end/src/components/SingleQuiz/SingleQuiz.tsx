import { Link, useParams } from "react-router-dom";
import {
  Quiz,
  QuizQuestion,
  useGetQuizByIdQuery,
} from "../../state/quiz/quizSlice";
import he from "he";
import NavBar from "../NavBar/NavBar";
import styles from "./SingleQuiz.module.scss";

function SingleQuiz() {
  const { id } = useParams();

  const {
    data: quizData,
    isError,
    isLoading,
    isSuccess,
  } = useGetQuizByIdQuery<Quiz>(id);

  const datePlayed = new Date(quizData?.createdAt).toDateString();

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

  if (isSuccess) {
    return (
      <>
        <NavBar>
          <Link to="/user">
            <button className={styles.back}>Go back </button>
          </Link>
        </NavBar>
        <article className={styles.single_quiz}>
          <section className={styles.header}>
            <span>
            <h3>Quiz #{quizData.id}</h3>
            <h3>Played on: {datePlayed}</h3>
            </span>
            {quizData.hasWon ? 
            <div className={styles.won}><h3>Game Result : Won</h3></div>  : <div className={styles.lost}><h3>Game Result : Lost</h3></div> }
          </section>
          <h2>Questions</h2>
          <article className={styles.question_list}>
          {quizData.quiz_questions.map((q: QuizQuestion) => (
            <section className={styles.single_question}>
              <p className={styles.title}>Question: {he.decode(q.title)}</p>
              {q.is_correct ? (
                <p>Correctly answered: Yes </p>
              ) : (
                <p>Correctly answered: No </p>
              )}
              <p>Answer given: {he.decode(q.given_answer)}</p>
            </section>
          ))}
          </article>
        </article>
      </>
    );
  }
}

export default SingleQuiz;
