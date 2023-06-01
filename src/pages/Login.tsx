import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

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
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/login/create">Cadastro</Link>
    </section>
  );
}
