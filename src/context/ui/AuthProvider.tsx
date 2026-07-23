import { useState, type FC, type ReactNode } from "react"
import { AuthContext } from "../lib/AuthContext"

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)

    return (
        <AuthContext value={{
            isAuthenticated: isAuth,
            setAuth: setIsAuth
        }}>
            {children}
        </AuthContext>
    )
}
