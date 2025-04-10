import "./App.css";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import SettingsPage from "./pages/SettingsPage.tsx";
import GamePage from "./pages/GamePage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<SettingsPage />} />
          <Route path="/play" element={<GamePage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
