import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";

export function Register() {
  return (
    <section className="animationLeft">
      <h1 className="title">Cadastre-se</h1>

      <form>
        <Input type="text" label="Usuário" name="username" />
        <Input type="email" label="E-mail" name="email" />
        <Input type="password" label="Senha" name="password" />

        <Button type="submit">Cadastrar</Button>
      </form>
    </section>
  );
}
