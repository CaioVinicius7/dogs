import { Input } from "../components/Form/Input";
import { Button } from "../components/Form/Button";

export function PasswordReset() {
  return (
    <section>
      <h1 className="title">Recupere a Senha</h1>

      <form>
        <Input label="Nova senha" type="password" name="newPassword" />

        <Button>Recuperar</Button>
      </form>
    </section>
  );
}
