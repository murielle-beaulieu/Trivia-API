import { QuizList } from "../components/QuizList/QuizList";

export function UserPage() {

  // we want to display
  //   - Quiz List with links to each quiz 
  //   - Options to filter all quizzes by if they were won or lost
  //
  //   - Singular quiz
  //   - The singular quiz should display all answered questions and given answers
  //   - The singular quiz should also give the score

    return (
        <>
        <header><h2>User Page</h2></header>
        <section>
            <h3>Quizzes: </h3>
            <QuizList/>
        </section>
        </>
    )
}