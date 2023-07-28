import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "./NotFound.module.css";

import { Button } from "../components/Form/Button";

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | Dogs</title>

        <meta name="robots" content="noindex" />
      </Helmet>

      <section className={`container ${styles.notFoundContainer}`}>
        <div className={styles.highlight}>
          <h1 className="title">Error: 404</h1>
          <span>Página não encontrada</span>
        </div>

        <Button>
          <Link to="/">Voltar ao início</Link>
        </Button>
      </section>
    </>
  );
}
