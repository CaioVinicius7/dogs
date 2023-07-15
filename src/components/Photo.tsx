import styles from "./Photo.module.css";

interface PhotoProps {
  title: string;
  url: string;
  views: number;
}

export function Photo({ title, url, views }: PhotoProps) {
  return (
    <li className={styles.photo}>
      <img src={url} alt={title} />
      <span className={styles.views}>{views}</span>
    </li>
  );
}
