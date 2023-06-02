import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      username,
      password
    });
  }

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          label="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          type="password"
          name="password"
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
      </form>

      <Link to="/login/create">Cadastro</Link>
    </section>
  );
}
