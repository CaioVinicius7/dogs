import { InputHTMLAttributes } from "react";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
}

export function Input({ name, label, error, ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      {!!label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <input id={name} name={name} className={styles.input} {...props} />

      {!!error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
