import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./DeletePostButton.module.css";

import { Spinner } from "./Spinner";

import { postService } from "../services/post";

interface DeletePostButtonProps {
  postId: number;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  async function handleDeletePost() {
    try {
      setIsLoading(true);

      await postService.deletePost({
        postId: postId
      });

      toast.success("Post excluído com sucesso.", {
        theme: "colored"
      });

      if (location.pathname.includes("/post")) {
        navigate(-1);

        return;
      }

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
