import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./Navigation.module.css";

import { useMedia } from "../hooks/useMedia";
import { useAuthContext } from "../hooks/useAuthContext";

import { ReactComponent as Feed } from "../assets/feed.svg";
import { ReactComponent as Stats } from "../assets/stats.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";

export function Navigation() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { logout } = useAuthContext();

  const { pathname } = useLocation();

  const isMobile = useMedia("(max-width: 40rem)"); // 40rem = 540px

  function handleChangeMenuVisibility() {
    setMenuIsOpen((state) => !state);
  }

  useEffect(() => {
    setMenuIsOpen(false);
  }, [pathname]);

  return (
    <>
      {isMobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            menuIsOpen && styles.mobileButtonActive
          }`}
          onClick={handleChangeMenuVisibility}
        />
      )}

      <nav
        className={`${isMobile ? styles.mobileNav : styles.nav} ${
          menuIsOpen && styles.activeMobileNav
        }`}
      >
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
    </>
  );
}
