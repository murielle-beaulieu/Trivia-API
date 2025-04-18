import { Link } from "react-router-dom";
import { QuizList } from "../../components/QuizList/QuizList";
import { useGetCurrentUserQuery } from "../../state/auth/authApiSlice";
import styles from "./UserPage.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import { useSelector } from "react-redux";
import UserDetails from "../../components/UserDetails/UserDetails";
import { RootState } from "../../state/store";

function UserPage() {
  const token = useSelector((state: RootState) => state.auth.token);

  console.log(token);

  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery({});

  console.log("Current user status:", {
    isLoading,
    isError,
    hasData: !!currentUser,
  });

  if (isLoading) {
    return (
      <div>
        <h2>Loading user data...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2> Error retrieving data </h2>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div>
        <h2>No user data available</h2>
      </div>
    );
  }

  console.log("Current user:", currentUser);

  // we want to display
  //   - Quiz List with links to each quiz
  //   - Options to filter all quizzes by if they were won or lost
  //
  //   - Singular quiz
  //   - The singular quiz should display all answered questions and given answers
  //   - The singular quiz should also give the score

  if (currentUser)
    return (
      <>
        <NavBar className={styles.user_nav}>
          <h2>
            Hello {currentUser.firstName} (id #{currentUser.id})
          </h2>
          <Link to="/">
            <button>Start a new game</button>
          </Link>
        </NavBar>
        <section>
          <h3>User Details: </h3>
          <UserDetails/>
        </section>
        <section>
          <h3>Quizzes: </h3>
          <QuizList />
        </section>
      </>
    );
}

export default UserPage;
