import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../components/Form/Input";
import { Button } from "../components/Form/Button";

const passwordLostFormValidationSchema = z.object({
  emailOrUsername: z
    .string({ required_error: "Esse campo é obrigatório." })
    .min(3, "Esse campo deve ter no mínimo 3 caracteres.")
});

type PasswordLostFormFields = z.infer<typeof passwordLostFormValidationSchema>;

export function PasswordLost() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PasswordLostFormFields>({
    resolver: zodResolver(passwordLostFormValidationSchema)
  });

  async function handleSendPasswordRecoveryEmail({
    emailOrUsername
  }: PasswordLostFormFields) {
    console.log({ emailOrUsername });
  }

  return (
    <section>
      <h1 className="title">Perdeu a senha?</h1>

      <form onSubmit={handleSubmit(handleSendPasswordRecoveryEmail)}>
        <Input
          label="Email / Usuário"
          error={errors.emailOrUsername?.message}
          {...register("emailOrUsername")}
        />

        <Button isLoading={isSubmitting}>Enviar Email</Button>
      </form>
    </section>
  );
}
