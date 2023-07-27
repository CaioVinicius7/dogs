import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../components/Form/Input";
import { Button } from "../components/Form/Button";

const passwordResetFormValidationSchema = z.object({
  newPassword: z
    .string({
      required_error: "Esse campo é obrigatório."
    })
    .min(8, {
      message: "A senha deve ter no mínimo 8 caracteres."
    })
    .regex(/\d/, "A senha deve conter pelo menos 1 número.")
    .regex(
      /[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/,
      "A senha eve conter pelo menos 1 caractere especial."
    )
});

type PasswordResetFormFields = z.infer<
  typeof passwordResetFormValidationSchema
>;

export function PasswordReset() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PasswordResetFormFields>({
    resolver: zodResolver(passwordResetFormValidationSchema)
  });

  async function handleResetPassword({ newPassword }: PasswordResetFormFields) {
    console.log({ newPassword });
  }

  return (
    <section>
      <h1 className="title">Recupere a Senha</h1>

      <form onSubmit={handleSubmit(handleResetPassword)}>
        <Input
          label="Nova senha"
          type="password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <Button type="submit" isLoading={isSubmitting}>
          Recuperar
        </Button>
      </form>
    </section>
  );
}
