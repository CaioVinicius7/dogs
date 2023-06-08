import { api } from "../libs/axios";

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface GetUserDataResponse {
  id: number;
  nome: string;
  username: string;
  email: string;
}

export const userService = {
  register: async ({ username, email, password }: RegisterRequest) => {
    await api.post("/api/user", {
      username,
      email,
      password
    });
  },
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
