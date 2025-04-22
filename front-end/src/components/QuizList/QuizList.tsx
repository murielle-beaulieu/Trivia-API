import { Link } from "react-router-dom";
import styles from "./QuizList.module.scss";
import { useGetCurrentUserQuery } from "../../state/auth/authApiSlice";
import { Quiz } from "../../state/quiz/quizSlice";

export function QuizList() {
  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery({});

  const quizzes = currentUser.quizzes;
  quizzes.forEach((q) => console.log(q));

  if (isLoading) {
    return (
      <div>
        <h2>Loading quiz data...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2> Error retrieving quiz data </h2>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div>
        <h2>No quiz data available</h2>
      </div>
    );
  }

  if (quizzes.length == 0) {
    return <section className={styles.list}>
      <h2>No quizzes just yet !</h2>
      <Link to={"/"}>Start playing!</Link>
    </section>;
  }

  if (quizzes.length > 0) {
    return (
      <section className={styles.list}>
        {quizzes?.map((quiz: Quiz) => (
            <Link to={`/quiz/${quiz.id}`}>
          <article>
              <h3>Quiz on difficulty: {quiz.difficulty}</h3>
          </article>
            </Link>
        ))}
      </section>
    );
  }
}
