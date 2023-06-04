import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";

import { useAuthContext } from "../contexts/AuthContext";

const loginFormValidationSchema = z.object({
  username: z
    .string({
      required_error: "Esse campo é obrigatório."
    })
    .min(3, {
      message: "Esse campo deve ter no mínimo 3 caracteres."
    }),
  password: z
    .string({
      required_error: "Esse campo é obrigatório."
    })
    .min(3, {
      message: "Esse campo deve ter no mínimo 3 caracteres."
    })
});

type LoginFormFields = z.infer<typeof loginFormValidationSchema>;

export function Login() {
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormValidationSchema),
    shouldFocusError: true
  });

  async function handleLogin({ username, password }: LoginFormFields) {
    await login(username, password);
  }

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <Input
          type="text"
          error={errors.username?.message}
          autoComplete="off"
          {...register("username")}
        />

        <Input
          type="password"
          label="Senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Carregando..." : "Entrar"}
        </Button>
      </form>
    </section>
  );
}
