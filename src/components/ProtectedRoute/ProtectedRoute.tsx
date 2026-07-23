import { useEffect, type FC, type ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { setOnAuthChange } from "../../api/axiosInstance"
import { useAuth } from "../../context/lib/useAuth"

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, changeAuthStatus } = useAuth()
    useEffect(() => {
        setOnAuthChange(changeAuthStatus)
    }, [changeAuthStatus])
    if (!isAuthenticated) return <Navigate to='/login' replace />

    return <>{children}</>

}
