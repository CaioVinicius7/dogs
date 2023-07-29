import { useEffect, useRef, useState } from "react";

import styles from "./PostComments.module.css";

import { CommentForm } from "./CommentForm";

import { useAuthContext } from "../hooks/useAuthContext";

export interface Comment {
  id: number;
  author: string;
  content: string;
}

interface PostCommentsProps {
  postId: number;
  single?: boolean;
  comments: Comment[];
}

export function PostComments({
  postId,
  single = false,
  comments: commentsReceivedByProps
}: PostCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(
    () => commentsReceivedByProps
  );

  const commentsSection = useRef<HTMLUListElement>(null);

  const { isAuthenticated } = useAuthContext();

  function handleAddComment({ id, content, author }: Comment) {
    setComments((state) => [
      ...state,
      {
        id,
        content,
        author
      }
    ]);
  }

  useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${single && styles.single}`}
      >
        {comments.map((comment) => (
          <li key={comment.id}>
            <b>{comment.author}: </b>
            <span>{comment.content}</span>
          </li>
        ))}
      </ul>

      {isAuthenticated && (
        <CommentForm
          postId={postId}
          onAddComment={handleAddComment}
          single={single}
        />
      )}
    </>
  );
}
