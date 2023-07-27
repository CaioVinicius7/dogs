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
