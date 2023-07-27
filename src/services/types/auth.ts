export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RecoveryPasswordRequest {
  emailOrUsername: string;
}

export interface ResetPasswordRequest {
  key: string;
  usernameOrEmail: string;
  newPassword: string;
}
