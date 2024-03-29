import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Post.module.css";

import { Image } from "./Image";
import { Loading } from "./Loading";
import { PostComments } from "./PostComments";
import { DeletePostButton } from "./DeletePostButton";

import { postService } from "../services/post";
import { useAuthContext } from "../hooks/useAuthContext";

interface PostComment {
  id: number;
  author: string;
  content: string;
}

interface PostData {
  id: number;
  author: string;
  title: string;
  date: string;
  url: string;
  weight: number;
  age: number;
  views: number;
  comments: PostComment[];
}

interface PostProps {
  postId: number;
  single?: boolean;
}

export function Post({ postId, single = false }: PostProps) {
  const [postData, setPostData] = useState<PostData | null>(null);
  const { isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    postService
      .getPostById({
        postId
      })
      .then((response) => setPostData(response));
  }, [postId]);

  if (!postData) {
    return <Loading />;
  }

  const isPostOwner = isAuthenticated && user?.username === postData.author;

  return (
    <div className={`${styles.post} ${single && styles.single}`}>
      <div className={styles.img}>
        <Image src={postData.url} alt={postData.title} />
      </div>

      <div className={styles.details}>
        <p className={styles.author}>
          {isPostOwner ? (
            <DeletePostButton postId={postData.id} />
          ) : (
            <Link to={`/profile/${postData.author}`}>@{postData.author}</Link>
          )}

          <span className={styles.views}>{postData.views}</span>
        </p>

        <h1 className="title">
          <Link to={`/post/${postData.id}`}>{postData.title}</Link>
        </h1>

        <ul className={styles.attributes}>
          <li>{postData.weight} kg</li>
          <li>
            {postData.age} {postData.age === 1 ? "ano" : "anos"}
          </li>
        </ul>
      </div>

      <PostComments
        postId={postData.id}
        single={single}
        comments={postData.comments}
      />
    </div>
  );
}
