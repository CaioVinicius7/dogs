import styles from "./Photo.module.css";

import { Image } from "./Image";

interface PhotoProps {
  title: string;
  url: string;
  views: number;
  onClick: () => void;
}

export function Photo({ title, url, views, onClick }: PhotoProps) {
  return (
    <li className={styles.photo} onClick={onClick}>
      <Image src={url} alt={title} />
      <span className={styles.views}>{views}</span>
    </li>
  );
}
