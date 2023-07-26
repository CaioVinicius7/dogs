import { api } from "../libs/axios";

import type { GetUserDataResponse, RegisterRequest } from "./types/user";

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
