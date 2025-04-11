import "./App.css";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import SettingsPage from "./pages/SettingsPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import { UserPage } from "./pages/UserPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/" element={<SettingsPage />} />
          <Route path="/play" element={<GamePage />} />
          <Route path="/user" element={<UserPage/>}/>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
