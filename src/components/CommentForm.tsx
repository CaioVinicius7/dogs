import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

import { Comment } from "./PostComments";

import styles from "./CommentForm.module.css";

import { ReactComponent as Send } from "../assets/send.svg";

import { postService } from "../services/post";

const commentFormValidationSchema = z.object({
  comment: z
    .string({
      required_error: "O campo é obrigatório"
    })
    .min(3, {
      message: "O comentário deve ter no mínimo 3 caracteres."
    })
    .max(100, {
      message: "O comentário pode ter no máximo 100 caracteres."
    })
});

type CommentFormFields = z.infer<typeof commentFormValidationSchema>;

interface CommentFormProps {
  postId: number;
  onAddComment: (comment: Comment) => void;
}

export function CommentForm({ postId, onAddComment }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CommentFormFields>({
    resolver: zodResolver(commentFormValidationSchema),
    shouldFocusError: false
  });

  async function handleAddComment({ comment }: CommentFormFields) {
    try {
      const { id, content, author } = await postService.addComment({
        postId,
        comment
      });

      onAddComment({
        id,
        content,
        author
      });
    } catch {
      toast.error(
        "Erro ao adicionar o comentário. Tente novamente mais tarde",
        {
          theme: "colored"
        }
      );
    } finally {
      reset();
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleAddComment)}>
      <textarea
        className={styles.textarea}
        aria-label="Adicione um comentário"
        placeholder="Comente..."
        maxLength={100}
        style={{
          borderColor: errors.comment && "#f31",
          boxShadow: errors.comment && "none"
        }}
        {...register("comment")}
      />

      <button className={styles.button} disabled={isSubmitting}>
        <Send />
      </button>
    </form>
  );
}
