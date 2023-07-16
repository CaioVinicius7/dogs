import styles from "./CommentForm.module.css";

import { ReactComponent as Send } from "../assets/send.svg";

export function CommentForm() {
  return (
    <form className={styles.form}>
      <textarea
        className={styles.textarea}
        aria-label="Adicione um comentário"
        placeholder="Comente..."
        maxLength={100}
      />

      <button className={styles.button}>
        <Send />
      </button>
    </form>
  );
}
