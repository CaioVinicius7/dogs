import { InputHTMLAttributes, forwardRef } from "react";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Omit<InputProps, "ref">>(
  ({ name, label, error, ...props }, ref) => (
    <div className={styles.wrapper}>
      {!!label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        className={styles.input}
        ref={ref}
        {...props}
      />

      {!!error && <p className={styles.error}>{error}</p>}
    </div>
  )
);
