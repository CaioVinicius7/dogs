import { api } from "../libs/axios";

import type { LoginRequest, LoginResponse } from "./types/auth";

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
