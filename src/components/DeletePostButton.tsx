import { useState } from "react";
import { toast } from "react-toastify";

import styles from "./DeletePostButton.module.css";

import { postService } from "../services/post";
import { Spinner } from "./Spinner";

interface DeletePostButtonProps {
  postId: number;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeletePost() {
    try {
      setIsLoading(true);

      await postService.deletePost({
        postId: postId
      });

      window.location.reload();
    } catch {
      toast.error(
        "Ocorreu um erro ao excluir o post. Tente novamente mais tarde",
        {
          theme: "colored"
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      className={styles.deletePostButton}
      disabled={isLoading}
      onClick={handleDeletePost}
    >
      {isLoading ? <Spinner size={12} /> : "Excluir"}
    </button>
  );
}
