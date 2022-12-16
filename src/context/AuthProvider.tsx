import { createContext, useState, PropsWithChildren } from "react";

export type TAuthContext = {
  auth: {
    roles: number[];
    user: { userEmail: string; email: string } | undefined;
    accessToken: string;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      roles: number[];
      user: {
        userEmail: string;
        email: string;
      };
      accessToken: string;
    }>
  >;
};

export const initialAuth = {
  roles: [0],
  user: { userEmail: "", email: "" },
  accessToken: "",
};

const AuthContext = createContext<TAuthContext>({
  auth: initialAuth,
  setAuth: () => undefined,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState(initialAuth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
