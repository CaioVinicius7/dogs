import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const isAuthenticated = !!user;

  const navigate = useNavigate();

  async function getUserData() {
    try {
      const { id, name, username, email } = await userService.getUserData();

      setUser({ id, name, username, email });
    } catch (error) {
      // Do nothing
    }
  }

  async function login(username: string, password: string) {
    try {
      const { token } = await authService.login({
        username,
        password
      });

      localStorage.setItem("token", token);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      getUserData();

      navigate("/account");
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        toast.warning("Dados incorretos.", {
          theme: "colored"
        });

        return;
      }

      toast.error(
        "Ocorreu um erro ao fazer login, tente novamente mais tarde.",
        {
          theme: "colored"
        }
      );
    }
  }

  function logout() {
    setUser(null);

    localStorage.removeItem("token");

    navigate("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      getUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout
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
