import { Outlet } from "react-router-dom";

import styles from "./DefaultLayout.module.css";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function DefaultLayout() {
  return (
    <>
      <Header />

      <div className={styles.defaultLayoutContentContainer}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
