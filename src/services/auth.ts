import { api } from "../libs/axios";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const authService = {
  login: async ({ username, password }: LoginRequest) => {
    const { data } = await api.post<LoginResponse>("/jwt-auth/v1/token", {
      username,
      password
    });

    return {
      token: data.token
    };
  }
};