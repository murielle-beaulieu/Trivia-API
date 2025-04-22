import Settings from "../../components/Settings/Settings";
import { GameSettingsData } from "../../components/Settings/settings-schema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { defineSettings } from "../../state/settings/settingsSlice";
import { useNavigate } from "react-router-dom";
// import { SessionType, setSessionType } from "../../state/game/gameSlice";
import NavBar from "../../components/NavBar/NavBar";

function SettingsPage() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function handleSettings(data: GameSettingsData) {
    dispatch(defineSettings(data));
    navigate("/play");
}

  // const sessionType = useSelector((state: RootState) => state.game.sessionType);
  // console.log(sessionType);

  // function handleSessionType(data: SessionType): void {
  //   dispatch(setSessionType(data))

  //   if(data == SessionType.USER) {
  //     navigate("/auth");
  //   }

  //   if(data == SessionType.GUEST) {
  //     navigate("/settings");
  //   }
  // }

  // if (sessionType == null){
  //   return (
  //     <>
  //     <NavBar>{""}</NavBar>
  //     <h1>Welcome to Trivia</h1>
  //     <h3>You can play as a guest or log in to track your progress</h3>
  //     <button onClick={() => handleSessionType(SessionType.GUEST)}>Play as guest</button>
  //     <button onClick={() =>handleSessionType(SessionType.USER)}>Log In</button>
  //     </>
  //   )
  // }
  
  // if (sessionType == SessionType.GUEST) {
    return (
      <>
        <NavBar>{""}</NavBar>
        <Settings onSubmit={handleSettings} />
      </>
    )
  // }

  // if (sessionType == SessionType.USER) {
  //   return (
  //     <>
  //       <NavBar>{""}</NavBar>
  //       <Settings onSubmit={handleSettings} />
  //     </>
  //   );
  // }
}

export default SettingsPage;
