import { useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";

import { useAuthContext } from "../hooks/useAuthContext";

import { ReactComponent as Feed } from "../assets/feed.svg";
import { ReactComponent as Stats } from "../assets/stats.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";

export function Navigation() {
  const [isMobile] = useState(null);

  const { logout } = useAuthContext();

  return (
    <nav className={styles.nav}>
      <NavLink to="/account" end>
        <Feed />
        {isMobile && "Minhas Fotos"}
      </NavLink>
      <NavLink to="/account/stats">
        <Stats />
        {isMobile && "Estatísticas"}
      </NavLink>
      <NavLink to="/account/post">
        <Plus />
        {isMobile && "Adicionar Foto"}
      </NavLink>

      <button onClick={logout}>
        <Logout />
        {isMobile && "Sair"}
      </button>
    </nav>
  );
}
