import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Router } from "./Router";
import { AuthContextProvider } from "./contexts/AuthContext";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />

        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
