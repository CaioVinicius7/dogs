import { Link } from "react-router-dom";

import styles from "./Header.module.css";

import { useAuthContext } from "../hooks/useAuthContext";

import { ReactComponent as DogIcon } from "../assets/dog-icon.svg";

export function Header() {
  const { user } = useAuthContext();

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.logo} aria-label="Dogs - Home">
          <DogIcon />
        </Link>

        {user ? (
          <Link to="/account" className={styles.login}>
            {user.username}
          </Link>
        ) : (
          <Link to="/login" className={styles.login}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
}
