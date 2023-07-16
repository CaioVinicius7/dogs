import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import styles from "./CommentForm.module.css";

import { ReactComponent as Send } from "../assets/send.svg";

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

export function CommentForm() {
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
    console.log({ comment });

    reset();
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
