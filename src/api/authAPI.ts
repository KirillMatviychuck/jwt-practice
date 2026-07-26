import { instance } from "./axiosInstance";
import { clearTokens, refreshToken } from "./tokenStorage";


export const authAPI = {
    login(email: string, password: string) {
        return instance.post('/auth/login', { email, password })
    },
    logout() {
        const token = refreshToken;
        clearTokens()
        return instance.post('/auth/logout', { refreshToken: token })
    },
    register(email: string, password: string) {
        return instance.post('/auth/register', { email, password })
    },
    isLoggedIn() {
        return !!refreshToken
    },
    refreshToken(refreshToken: string) {
        return instance.post('/auth/refresh', { refreshToken })
    }
}