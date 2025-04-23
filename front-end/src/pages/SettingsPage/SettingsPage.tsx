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

  return (
    <>
      <NavBar>{""}</NavBar>
      <Settings onSubmit={handleSettings} />
    </>
  );
}

export default SettingsPage;
