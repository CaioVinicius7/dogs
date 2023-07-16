import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Post.module.css";

import { Loading } from "./Loading";
import { PostComments } from "./PostComments";

import { postService } from "../services/post";

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
}

export function Post({ postId }: PostProps) {
  const [postData, setPostData] = useState<PostData | null>(null);

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

  return (
    <div className={styles.post}>
      <div className={styles.img}>
        <img src={postData.url} alt={postData.title} />
      </div>

      <div className={styles.details}>
        <p className={styles.author}>
          <Link to={`/profile/${postData.author}`}>@{postData.author}</Link>
          <span className={styles.views}>{postData.views}</span>
        </p>

        <h1 className="title">
          <Link to={`/photo/${postData.id}`}>{postData.title}</Link>
        </h1>

        <ul className={styles.attributes}>
          <li>{postData.weight} kg</li>
          <li>
            {postData.age} {postData.age === 1 ? "ano" : "anos"}
          </li>
        </ul>
      </div>

      <PostComments postId={postData.id} comments={postData.comments} />
    </div>
  );
}
