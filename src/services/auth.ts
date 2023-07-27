import { api } from "../libs/axios";

import type {
  LoginRequest,
  LoginResponse,
  RecoveryPasswordRequest
} from "./types/auth";

export const authService = {
  login: async ({ username, password }: LoginRequest) => {
    const { data } = await api.post<LoginResponse>("/jwt-auth/v1/token", {
      username,
      password
    });

    return {
      token: data.token
    };
  },
  passwordLost: async ({ emailOrUsername }: RecoveryPasswordRequest) => {
    const returnUrl = window.location.href.replace("lost", "reset");

    await api.post("/api/password/lost", {
      login: emailOrUsername,
      url: returnUrl
    });
  }
};
