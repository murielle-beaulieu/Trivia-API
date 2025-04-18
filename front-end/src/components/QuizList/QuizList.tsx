import { Link } from "react-router-dom";
import styles from "./QuizList.module.scss";
import { useGetCurrentUserQuery } from "../../state/auth/authApiSlice";
import { Quiz } from "../../state/quiz/quizSlice";

export function QuizList() {

  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery({});
  
  const quizzes = currentUser.quizzes;
  console.log(quizzes);

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

  return (
    <section className={styles.list}>
      {quizzes?.map((quiz : Quiz )=> (
        <div>
          <Link to={`/quiz/${quiz.id}`}>
            <h3>
              Quiz on difficulty: {quiz.difficulty}
            </h3>      
          </Link>
        </div>
      ))}
    </section>
  );
}
