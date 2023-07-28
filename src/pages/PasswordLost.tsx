import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAxiosError } from "axios";

import styles from "./PasswordLost.module.css";

import { Input } from "../components/Form/Input";
import { Button } from "../components/Form/Button";

import { authService } from "../services/auth";

const passwordLostFormValidationSchema = z.object({
  emailOrUsername: z
    .string({ required_error: "Esse campo é obrigatório." })
    .min(3, "Esse campo deve ter no mínimo 3 caracteres.")
});

type PasswordLostFormFields = z.infer<typeof passwordLostFormValidationSchema>;

export function PasswordLost() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<PasswordLostFormFields>({
    resolver: zodResolver(passwordLostFormValidationSchema)
  });

  async function handleSendPasswordRecoveryEmail({
    emailOrUsername
  }: PasswordLostFormFields) {
    try {
      await authService.passwordLost({
        emailOrUsername
      });

      toast.success("Email de recuperação enviado com sucesso.", {
        theme: "colored"
      });

      setSuccessMessage(
        "Um e-mail com instruções para a troca de senha. Por favor, verifique sua caixa de entrada."
      );
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setError("emailOrUsername", {
          message: "Usuário não existente."
        });

        return;
      }

      toast.error(
        "Ocorreu um erro ao tentar enviar o email de recuperação. Tente novamente mais tarde",
        {
          theme: "colored"
        }
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>Recupere sua senha | Dogs</title>

        <meta name="description" content="Recupere sua senha" />
      </Helmet>

      <section>
        <h1 className="title">Perdeu a senha?</h1>

        {successMessage ? (
          <p className={styles.successMessage}>{successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit(handleSendPasswordRecoveryEmail)}>
            <Input
              label="Email / Usuário"
              error={errors.emailOrUsername?.message}
              {...register("emailOrUsername")}
            />

            <Button type="submit" isLoading={isSubmitting}>
              Enviar Email
            </Button>
          </form>
        )}
      </section>
    </>
  );
}
