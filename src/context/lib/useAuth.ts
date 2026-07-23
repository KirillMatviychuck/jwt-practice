import { useCallback, useContext } from "react"
import { AuthContext } from "./AuthContext"


export const useAuth = () => {
    const { isAuthenticated, setAuth } = useContext(AuthContext)

    const changeAuthStatus = useCallback((auth: boolean) => setAuth(auth), [setAuth])

    return {
        isAuthenticated,
        changeAuthStatus
    }
}