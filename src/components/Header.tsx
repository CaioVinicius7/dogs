import { Link } from "react-router-dom";

import styles from "./Header.module.css";

import { ReactComponent as DogIcon } from "../assets/dog-icon.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.logo} aria-label="Dogs - Home">
          <DogIcon />
        </Link>

        <Link to="/login" className={styles.login}>
          Login / Criar
        </Link>
      </nav>
    </header>
  );
}
