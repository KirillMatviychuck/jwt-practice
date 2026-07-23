import { createContext } from "react";

export interface AuthContextProps {
    isAuthenticated: boolean;
    setAuth: (auth: boolean) => void;
}
export const defaultValue: AuthContextProps = {
    isAuthenticated: false,
    setAuth() { }
}

export const AuthContext = createContext<AuthContextProps>(defaultValue)
