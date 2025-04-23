import "./App.css";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import SettingsPage from "./pages/SettingsPage/SettingsPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import UserPage from "./pages/UserPage/UserPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import SingleQuiz from "./components/SingleQuiz/SingleQuiz.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/user" element={<UserPage />}/>
            <Route path="/quiz/:id" element={<SingleQuiz />} />
            <Route path="/play" element={<GamePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
