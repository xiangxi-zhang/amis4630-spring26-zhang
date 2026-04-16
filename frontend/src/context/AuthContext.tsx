import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as authService from "../services/authService";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setTokenState] = useState<string | null>(() =>
    authService.getToken()
  );

  async function loginUser(email: string, password: string) {
    const response = await authService.login({ email, password });
    authService.setToken(response.token);
    setTokenState(response.token);
  }

  async function registerUser(email: string, password: string) {
    await authService.register({ email, password });
  }

  function logout() {
    authService.removeToken();
    setTokenState(null);
  }

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      loginUser,
      registerUser,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}