import { Link, useNavigate } from "react-router-dom";
import { QuizList } from "../../components/QuizList/QuizList";
import { useGetCurrentUserQuery } from "../../state/auth/authApiSlice";
import styles from "./UserPage.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import UserDetails from "../../components/UserDetails/UserDetails";
import { RootState } from "../../state/store";
import { logOut } from "../../state/auth/authSlice";

function UserPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
    navigate("/auth");
  }

  if (!currentUser) {
    return (
      <div>
        <h2>No user data available</h2>
      </div>
    );
  }

  function handleLogout() {
    dispatch(logOut(currentUser));
    navigate("/auth");
  }

  console.log("Current user:", currentUser);

  if (currentUser)
    return (
      <>
        <NavBar>
          <h2>Hello {currentUser.firstName}</h2>
          <Link to="/">
            <button>Start a new game</button>
          </Link>
          <button onClick={() => handleLogout()}>Log out</button>
        </NavBar>
        <main className={styles.user_main}>
          <section>
            <UserDetails />
          </section>
          <section>
            <h3>Quizzes History: </h3>
            <QuizList />
          </section>
        </main>
      </>
    );
}

export default UserPage;
