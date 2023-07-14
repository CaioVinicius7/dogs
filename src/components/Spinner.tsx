import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: number;
}

export function Spinner({ size }: SpinnerProps) {
  return (
    <div
      className={styles.spinner}
      style={{
        width: size,
        height: size
      }}
    />
  );
}
