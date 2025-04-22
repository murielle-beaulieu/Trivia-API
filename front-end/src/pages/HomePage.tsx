import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { useNavigate } from "react-router-dom";
import { SessionType, setSessionType } from "../state/game/gameSlice";
import NavBar from "../components/NavBar/NavBar";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function handleSessionType(data: SessionType): void {
    dispatch(setSessionType(data));

    if (data == SessionType.USER) {
      navigate("/auth");
    }

    if (data == SessionType.GUEST) {
      navigate("/settings");
    }
  }

  const sessionType = useSelector((state: RootState) => state.game.sessionType);
  console.log(sessionType);

  return (
    <>
      <NavBar>{""}</NavBar>
      <h1>Welcome to Trivia</h1>
      <h3>You can play as a guest or log in to track your progress</h3>
      <button onClick={() => handleSessionType(SessionType.GUEST)}>
        Play as guest
      </button>
      <button onClick={() => handleSessionType(SessionType.USER)}>
        Log In
      </button>
    </>
  );
}

export default HomePage;
