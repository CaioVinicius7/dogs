import { MouseEvent, useEffect } from "react";
import { Post } from "./Post";

import styles from "./PostModal.module.css";

interface PostModalProps {
  postId: number;
  closeModal: () => void;
}

export function PostModal({ postId, closeModal }: PostModalProps) {
  function handleOutsideClick(event: MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <dialog className={styles.modal} onClick={handleOutsideClick}>
      <Post postId={postId} />
    </dialog>
  );
}
