import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

import { Button } from "../components/Form/Button";

export function NotFound() {
  return (
    <section className={`container ${styles.notFoundContainer}`}>
      <div className={styles.highlight}>
        <h1 className="title">Error: 404</h1>
        <span>Página não encontrada</span>
      </div>

      <Button>
        <Link to="/">Voltar ao início</Link>
      </Button>
    </section>
  );
}
