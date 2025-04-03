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
          <Route path="/" element={<GamePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
