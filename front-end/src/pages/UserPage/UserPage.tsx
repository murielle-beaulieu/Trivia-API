import { Link } from "react-router-dom";
import { QuizList } from "../../components/QuizList/QuizList";
import { useGetCurrentUserQuery } from "../../state/auth/authApiSlice";
import styles from "./UserPage.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import UserDetails from "../../components/UserDetails/UserDetails";
import { RootState } from "../../state/store";
import { logOut, setUser } from "../../state/auth/authSlice";

function UserPage() {
  const token = useSelector((state: RootState) => state.auth.token);

  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  console.log("from user page -- authenticated? : " + isAuth);

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
    <div>
      <h2>There was an error loading the user data</h2>
      <Link to="/">Try signing in again</Link>
    </div>;
  }

  if (!currentUser) {
    return (
      <div>
        <h2>No user data available</h2>
      </div>
    );
  }

  function handleLogout() {
    dispatch(logOut());
  }

  console.log("Current user:", currentUser);

  if (currentUser) dispatch(setUser(currentUser));
  return (
    <>
      <NavBar>
        <div className={styles.nav_details}>
          <Link to="/settings">
            <button>Start a new game</button>
          </Link>
          <button onClick={() => handleLogout()}>Log out</button>
        </div>
      </NavBar>
      <main className={styles.user_main}>
        <section>
          <h4>Signed in as: </h4>
          <UserDetails />
        </section>
        <section>
          <h4>Your quiz history: </h4>
          <QuizList />
        </section>
      </main>
    </>
  );
}

export default UserPage;
