import { Link, useParams } from "react-router-dom";
import {
  Quiz,
  QuizQuestion,
  useGetQuizByIdQuery,
} from "../../state/quiz/quizSlice";
import NavBar from "../NavBar/NavBar";
import styles from "./SingleQuiz.module.scss";

function SingleQuiz() {
  const { id } = useParams();

  // const numberId = parseInt(id);

  const {
    data: quizData,
    isError,
    isLoading,
    isSuccess,
  } = useGetQuizByIdQuery<Quiz>(id);

  console.log(quizData);

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
            <button>Go back </button>
          </Link>
        </NavBar>
        <article className={styles.single_quiz}>
          <h2>Quiz # {quizData.id}</h2>
          {quizData.hasWon ? <h2>Won</h2> : <h2>Lost</h2>}
          <h2>Questions</h2>
          {quizData.quiz_questions.map((q: QuizQuestion) => (
            <section>
              <p>Question: {q.title}</p>
              {q.is_correct ? (
                <p>Correctly answered: true </p>
              ) : (
                <p>Correctly answered: false </p>
              )}
              <p>Answer given: {q.given_answer}</p>
            </section>
          ))}
        </article>
      </>
    );
  }
}

export default SingleQuiz;
