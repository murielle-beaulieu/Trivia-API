import { useParams } from "react-router-dom";
import { Quiz, QuizQuestion, useGetQuizByIdQuery } from "../../state/quiz/quizSlice";

function SingleQuiz() {
  const { id } = useParams();

  const numberId = parseInt(id) + 0;

  const {
    data: quizData,
    isError,
    isLoading,
    isSuccess,
  } = useGetQuizByIdQuery<Quiz>(numberId);

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
        <h2>Quiz # {id}</h2>
        {/* <h3>Played on: {datePlayed}</h3> */}
        <section>
          {quizData.has_won ? (
            <h3>Won</h3>
          ) : (
            <h3>Lost - score of {quizData}/10</h3>
          )}
          <h3>Played on difficulty: {quizData.difficulty}</h3>
          <div>
            {quizData.quiz_questions.map((q: QuizQuestion) => (
              <section>
                <p>Question: {q.title}</p>
                <p>Correctly answered: {q.is_correct}</p>
                <p>Answer given: {q.given_answer}</p>
              </section>
            ))}
          </div>
        </section>
      </>
    );
  }
}


export default SingleQuiz;