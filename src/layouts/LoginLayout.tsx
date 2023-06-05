import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import styles from "./LoginLayout.module.css";

export function LoginLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [navigate, isAuthenticated]);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  );
}
