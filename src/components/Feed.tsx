import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Feed.module.css";

import { Photo } from "./Photo";
import { Loading } from "./Loading";

import { postService } from "../services/post";

import { useAuthContext } from "../hooks/useAuthContext";

interface PostData {
  id: number;
  author: string;
  title: string;
  date: string;
  url: string;
  weight: number;
  age: number;
  views: number;
  comments: number;
}

/**
 *   A propriedade userId é recebida e repassada para o service quando queremos
 *   buscar apenas o feed de um usuário específico
 */
interface FeedProps {
  userId?: number;
  onSelectPost: (postId: number) => void;
}

export function Feed({ userId, onSelectPost }: FeedProps) {
  const [posts, setPosts] = useState<PostData[] | null>(null);

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    postService
      .getPosts({
        page: 1,
        itemsPerPage: 6,
        userId
      })
      .then((response) => setPosts(response));
  }, [userId]);

  if (!posts) {
    return <Loading />;
  }

  if (posts.length === 0) {
    return (
      <div className={styles.emptyListMessageContainer}>
        <h2>Ops! Nenhum post encontrado</h2>

        {isAuthenticated && (
          <span>
            <Link to="/account/post">Clique aqui</Link> e crie seu primeiro
            post.
          </span>
        )}
      </div>
    );
  }

  return (
    <ul className={`animationLeft ${styles.feed}`}>
      {posts.map((post) => {
        function handleSelectPost() {
          onSelectPost(post.id);
        }

        return (
          <Photo
            key={post.id}
            title={post.title}
            url={post.url}
            views={post.views}
            onClick={handleSelectPost}
          />
        );
      })}
    </ul>
  );
}
