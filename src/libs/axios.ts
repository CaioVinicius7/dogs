import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (!!error.response && [401, 403].includes(error.response.status)) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);
