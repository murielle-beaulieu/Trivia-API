import { Link } from "react-router-dom";
import styles from "./QuizList.module.scss";
import { useGetCurrentUserQuery } from "../../state/auth/authApiSlice";

export function QuizList() {

  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery({});
  
  const quizzes = currentUser.quizzes;
  console.log(quizzes);

  return (
    <section className={styles.list}>
      {quizzes?.map((quiz) => (
        <div>
          <Link to={`/quiz/${quiz.id}`}>
            <h3>
              Quiz #:{quiz.id} on difficulty: {quiz.difficulty}
            </h3>
          </Link>
        </div>
      ))}
    </section>
  );
}
