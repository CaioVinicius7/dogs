import { Link } from "react-router-dom";

import styles from "./Post.module.css";

interface PostProps {
  postId: number;
}

export function Post({ postId }: PostProps) {
  return (
    <div className={styles.post}>
      <div className={styles.img}>
        <img
          src="https://dogsapi.origamid.dev/wp-content/uploads/2020/07/freddie-marriage-w39PTDxKiK8-unsplash-1-1000x1000.jpg"
          alt=""
        />
      </div>

      <div className={styles.details}>
        <p className={styles.author}>
          <Link to={`/profile/:id`}>@autor</Link>
          <span className={styles.views}>1</span>
        </p>

        <h1 className="title">
          <Link to={`/photo/:id`}>Título</Link>
        </h1>

        <ul className={styles.attributes}>
          <li>10 kg</li>
          <li>2 anos(s)</li>
        </ul>

        <span>Comentários</span>
      </div>
    </div>
  );
}
