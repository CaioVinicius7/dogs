import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import styles from "./AccountLayout.module.css";

import { Navigation } from "../components/Navigation";

const pageTitle: Record<string, string> = {
  "/account": "Minha conta",
  "/account/stats": "Estatísticas",
  "/account/post": "Poste sua foto"
};

export function AccountLayout() {
  const [title, setTitle] = useState("");

  const location = useLocation();

  useEffect(() => {
    const path =
      location.pathname.charAt(location.pathname.length - 1) === "/"
        ? location.pathname.slice(0, -1)
        : location.pathname;

    setTitle(pageTitle[path]);
  }, [location.pathname]);

  return (
    <main className="container">
      <header className={styles.header}>
        <h1 className="title">{title}</h1>

        <Navigation />
      </header>

      <div className={styles.accountLayoutContentContainer}>
        <Outlet />
      </div>
    </main>
  );
}
