import { Link } from "react-router-dom";
import { QuizList } from "../components/QuizList/QuizList";
import { useGetCurrentUserQuery } from "../state/auth/authApiSlice";


function UserPage() {
    
    const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery({});

    console.log("Current user status:", { isLoading, isError, hasData: !!currentUser });
    
    if (isLoading) {
      return <div>Loading user data...</div>;
    }
    
    if (isError) {
      return <div>Error loading user data</div>;
    }
    
    if (!currentUser) {
      return <div>No user data available</div>;
    }
    
    console.log("Current user:", currentUser);

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
        <h2>Hello {currentUser.firstName} (id #{currentUser.id})</h2>
        <section>
            <h3>Quizzes: </h3>
            <Link to="/"><button>Start a new game</button></Link>
            <QuizList/>
        </section>
        </>
    )
}

export default UserPage;