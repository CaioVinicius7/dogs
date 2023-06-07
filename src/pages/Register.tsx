import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";

const registerFormValidationSchema = z
  .object({
    username: z
      .string({
        required_error: "Esse campo é obrigatório."
      })
      .min(3, {
        message: "Esse campo deve ter no mínimo 3 caracteres."
      }),
    email: z
      .string({
        required_error: "Esse campo é obrigatório."
      })
      .email("Esse campo deve ter um e-mail válido."),
    password: z
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
      ),
    confirmPassword: z.string({
      required_error: "Esse campo é obrigatório."
    })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "A confirmação da senha precisa corresponder a senha."
      });
    }
  });

type RegisterFormFields = z.infer<typeof registerFormValidationSchema>;

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerFormValidationSchema),
    shouldFocusError: true
  });

  function handleRegister({ username, email, password }: RegisterFormFields) {
    console.log({ username, email, password });
  }

  return (
    <section className="animationLeft">
      <h1 className="title">Cadastre-se</h1>

      <form onSubmit={handleSubmit(handleRegister)}>
        <Input
          type="text"
          label="Usuário"
          error={errors.username?.message}
          {...register("username")}
        />

        <Input
          type="text"
          label="E-mail"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          label="Senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          type="password"
          label="Confirmar senha"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Carregando..." : "Cadastrar"}
        </Button>
      </form>
    </section>
  );
}
