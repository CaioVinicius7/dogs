import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAxiosError } from "axios";

import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";

import { userService } from "../services/user";
import { useAuthContext } from "../hooks/useAuthContext";

const EMAIL_ALREADY_REGISTERED_ERROR = "Email já cadastrado";

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
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerFormValidationSchema),
    shouldFocusError: true
  });

  async function handleRegisterAndLogin({
    username,
    email,
    password
  }: RegisterFormFields) {
    try {
      await userService.register({
        username,
        email,
        password
      });

      toast.success("Cadastro realizado com sucesso.");

      await login(username, password);
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.data.message === EMAIL_ALREADY_REGISTERED_ERROR
      ) {
        setError("email", {
          message: "Email já cadastrado."
        });

        return;
      }

      toast.error("Ocorreu um erro inesperado ao realizar o cadastro.");
    }
  }

  return (
    <>
      <Helmet>
        <title>Cadastro | Dogs</title>

        <meta
          name="description"
          content="Crie sua conta e desfrute da nossa plataforma!"
        />
      </Helmet>

      <section className="animationLeft">
        <h1 className="title">Cadastre-se</h1>

        <form onSubmit={handleSubmit(handleRegisterAndLogin)}>
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

          <Button type="submit" isLoading={isSubmitting}>
            Cadastrar
          </Button>
        </form>
      </section>
    </>
  );
}
