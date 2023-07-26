import { Input } from "../components/Form/Input";
import { Button } from "../components/Form/Button";

export function PasswordLost() {
  return (
    <section>
      <h1 className="title">Perdeu a senha?</h1>

      <form>
        <Input name="email" label="Email / Usuário" />

        <Button>Enviar Email</Button>
      </form>
    </section>
  );
}
