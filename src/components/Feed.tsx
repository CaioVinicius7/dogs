import { useEffect, useState } from "react";

import styles from "./Feed.module.css";

import { Photo } from "./Photo";
import { Loading } from "./Loading";

import { postService } from "../services/post";

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

export function Feed() {
  const [posts, setPosts] = useState<PostData[] | null>(null);

  useEffect(() => {
    postService
      .getPosts({
        page: 1,
        itemsPerPage: 6
      })
      .then((response) => setPosts(response));
  }, []);

  if (!posts) {
    return <Loading />;
  }

  return (
    <ul className={`animationLeft ${styles.feed}`}>
      {posts.map((post) => (
        <Photo
          key={post.id}
          title={post.title}
          url={post.url}
          views={post.views}
        />
      ))}
    </ul>
  );
}
