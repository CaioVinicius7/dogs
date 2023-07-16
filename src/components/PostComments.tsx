import styles from "./PostComments.module.css";

import { CommentForm } from "./CommentForm";

import { useAuthContext } from "../hooks/useAuthContext";

interface Comment {
  id: number;
  author: string;
  content: string;
}

interface PostCommentsProps {
  comments: Comment[];
}

export function PostComments({ comments }: PostCommentsProps) {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <ul className={styles.comments}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <b>{comment.author}: </b>
            <span>{comment.content}</span>
          </li>
        ))}
      </ul>

      {isAuthenticated && <CommentForm />}
    </>
  );
}
