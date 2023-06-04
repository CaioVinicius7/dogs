import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";
import { AuthContextProvider } from "./contexts/AuthContext";

import "./App.css";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
