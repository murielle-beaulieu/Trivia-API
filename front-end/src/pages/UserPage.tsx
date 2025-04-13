// import { useSelector } from "react-redux";
// import { QuizList } from "../components/QuizList/QuizList";
// import { selectCurrentUser } from "../state/auth/authSlice";

import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from "../state/auth/authSlice";

function UserPage() {
    const currentUser = useSelector(selectCurrentUser);
    const currentToken = useSelector(selectCurrentToken);
    console.log("Current user:", currentUser); // Log the entire user object
    console.log("Email:", currentUser?.email);
    

    const welcome = currentUser? `Welcome ${currentUser}`:"Welcome";

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
            {welcome}
            {currentToken}
            {/* <QuizList/> */}
        </section>
        </>
    )
}

export default UserPage;