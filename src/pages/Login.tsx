import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";

import { useAuthContext } from "../contexts/AuthContext";

import "react-toastify/dist/ReactToastify.css";

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
    try {
      await login(username, password);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        toast.warning("Dados incorretos.", {
          theme: "colored"
        });

        return;
      }

      toast.error(
        "Ocorreu um erro ao fazer login, tente novamente mais tarde.",
        {
          theme: "colored"
        }
      );
    }
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
          Entrar
        </Button>
      </form>

      <ToastContainer />
    </section>
  );
}
