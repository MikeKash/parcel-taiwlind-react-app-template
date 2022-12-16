import { createContext, PropsWithChildren } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type TAuthContext = {
  auth?: {
    roles?: string[];
    user: { userEmail: string; userName: string };
    accessToken: string;
  };
  setAuth: (auth?: TAuthContext["auth"]) => void;
};

const AuthContext = createContext<TAuthContext>({
  auth: undefined,
  setAuth: () => undefined,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useLocalStorage<TAuthContext["auth"]>(
    "userData",
    undefined
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
