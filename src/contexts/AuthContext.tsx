import { ReactNode, createContext, useContext, useState } from "react";

import { api } from "../libs/axios";
import { authService } from "../services/auth";
import { userService } from "../services/user";

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (username: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const isAuthenticated = !!user;

  async function getUserData() {
    const { id, name, username, email } = await userService.getUserData();

    setUser({ id, name, username, email });
  }

  async function login(username: string, password: string) {
    const { token } = await authService.login({
      username,
      password
    });

    localStorage.setItem("token", token);

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    getUserData();
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}
