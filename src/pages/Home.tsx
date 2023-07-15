import { Feed } from "../components/Feed";

import styles from "./Home.module.css";

export function Home() {
  return (
    <section className={`container animationLeft ${styles.homeContainer}`}>
      <Feed />
    </section>
  );
}
