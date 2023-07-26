export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface GetUserDataResponse {
  id: number;
  nome: string;
  username: string;
  email: string;
}
