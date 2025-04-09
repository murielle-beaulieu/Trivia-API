import { useState } from "react";
import Settings from "../components/Settings/Settings";
import { GameSettingsData } from "../components/Settings/settings-schema";

function SettingsPage() {

    const [settings, setSettings] = useState({category: "9", difficulty: "MEDIUM"})
    console.log("start settings: " + settings.category, settings.difficulty)


    function handleSettings(data: GameSettingsData) {
       setSettings({category: data.category, difficulty: data.difficulty});
       console.log(data.category, data.difficulty);
       console.log("current settings: " + settings.category, settings.difficulty);
    }
    
    return (
        <Settings onSubmit={handleSettings}/>
    )
    

    // interface GameSettingsData {
    //   categories: string;
    //   difficulty: Difficulty;
    // }
}

export default SettingsPage;