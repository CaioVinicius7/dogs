import { ButtonHTMLAttributes, ReactNode } from "react";

import { Spinner } from "../Spinner";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({ children, isLoading = false, ...props }: ButtonProps) {
  return (
    <button className={styles.button} disabled={isLoading} {...props}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
