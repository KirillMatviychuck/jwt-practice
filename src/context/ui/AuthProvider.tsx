import { useEffect, useState, type FC, type ReactNode } from "react"
import { AuthContext } from "../lib/AuthContext"
import { setOnAuthChange } from "../../api/tokenStorage"

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    useEffect(() => {
        setOnAuthChange(setIsAuth)
    }, [])
    return (
        <AuthContext value={{
            isAuthenticated: isAuth,
            setAuth: setIsAuth
        }}>
            {children}
        </AuthContext>
    )
}
