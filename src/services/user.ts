import { api } from "../libs/axios";

interface GetUserDataResponse {
  id: number;
  nome: string;
  username: string;
  email: string;
}

export const userService = {
  getUserData: async () => {
    const { data } = await api.get<GetUserDataResponse>("/api/user");

    return {
      id: data.id,
      name: data.nome,
      username: data.username,
      email: data.email
    };
  }
};
