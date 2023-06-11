import { Navigate, Outlet } from "react-router-dom";

import { Loading } from "../components/Loading";

import { useAuthContext } from "../hooks/useAuthContext";

/**
 * isAuthenticated é TRUE caso os dados do usuário estiverem armazenados globalmente
 *
 * REGRAS:
 *  1 - Se ainda não existir os dados do usuário armazenado globalmente (isAuthenticated = false) porém existir o token --> Retorna o componente <Loading />
 *    - OBS: pode ser que não exista os dados usuário pois está realizando a busca dos dados na api utilizando o token
 *
 *  2 - Se ainda não existir os dados do usuário armazenado globalmente e nem o token --> redireciona para /login
 *    - OBS: O token pode não existir por dois motivos, o usuário não fez o login ou o token expirou e foi removido do local storage ao receber um 401 de algum endpoint
 *
 *  3 - Se existir os dados do usuário armazenado globalmente --> Continua o fluxo
 */

export function PrivateRoutes() {
  const { isAuthenticated } = useAuthContext();

  const tokenExists = !!localStorage.getItem("token");

  if (!isAuthenticated && tokenExists) {
    return <Loading />;
  }

  if (!isAuthenticated && !tokenExists) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
