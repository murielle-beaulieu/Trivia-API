import Settings from "../components/Settings/Settings";
import { GameSettingsData } from "../components/Settings/settings-schema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { defineSettings } from "../state/settings/settingsSlice";
import { Link, useNavigate } from "react-router-dom";

function SettingsPage() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function handleSettings(data: GameSettingsData) {
    // here we want to use the data received and use our action to set the new state
    console.log("heyyo" + data.category + " " + data.difficulty);
    console.log("yayayayaya " + data.category + " " + data.difficulty);
    dispatch(defineSettings(data));
    navigate("/play");
}

  return (
    <>
      <Settings onSubmit={handleSettings} />
      <Link to="/user"><button>back to User page</button></Link>
    </>
  );
}

export default SettingsPage;
