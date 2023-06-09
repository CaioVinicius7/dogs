import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";

import styles from "./Login.module.css";
import buttonStyles from "../components/Form/Button.module.css";

import { useAuthContext } from "../hooks/useAuthContext";

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
    <section className="animationLeft">
      <h1 className="title">Login</h1>

      <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
        <Input
          type="text"
          label="Usuário"
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

      <Link to="/login/password/lost" className={styles.passwordLost}>
        Perdeu a senha?
      </Link>

      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>

        <p>Ainda não possui conta? Cadastre-se no site.</p>

        <Link to="/login/create" className={buttonStyles.button}>
          Cadastro
        </Link>
      </div>
    </section>
  );
}
