import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategoriesQuery } from "../../state/trivia/triviaSlice";
import styles from "./Settings.module.scss";
import { useForm } from "react-hook-form";
import { GameSettingsData, schema } from "./settings-schema";
import { Difficulty } from "../../enums/difficulty";
import { selectCurrentToken } from "../../state/auth/authSlice";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import { RootState } from "../../state/store";

interface GameSettingsProps {
  onSubmit: (data: GameSettingsData) => unknown;
}

function Settings({ onSubmit }: GameSettingsProps) {

  const { data: categoriesData } = useGetCategoriesQuery();

  const { handleSubmit, register } = useForm<GameSettingsData>({
    resolver: zodResolver(schema),
  });

  const count = useSelector((state: RootState) => state.counter.value);
console.log("the count should be zero: " + count);
    const isPlaying = useSelector((state: RootState) => state.game.playing);
    console.log(isPlaying + " is playing from settings");

  const difficulties = Object.values(Difficulty);

  const toki = useSelector(selectCurrentToken);
  console.log("toki " + toki);

  return (
    <>
    <NavBar><Link to="/user"><button>Back to profile</button></Link></NavBar>
    <main>
      <header className={styles.banner}>
        <h1>Start a new game</h1>
        <h2>Choose your game settings and start playing!</h2>
      </header>
      {categoriesData && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2>Select your difficulty</h2>
            <select {...register("difficulty")}>
              {difficulties.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <h2>Select your category</h2>
            <select {...register("category")}>
              {categoriesData.trivia_categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.start_game}>
            <button className="submit">Start Game!</button>
          </div>
        </form>
      )}
    </main>
    </>
  );
}

export default Settings;
