import axios from 'axios';
import { accessToken, clearTokens, refreshToken, setTokens } from './tokenStorage';
import { authAPI } from './authAPI';


const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config

        if (originalRequest.url?.includes('/auth/refresh')) {
            clearTokens();
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            try {
                originalRequest._retry = true
                const response = await authAPI.refreshToken(refreshToken)
                setTokens(response.data, refreshToken)
                return instance.request(originalRequest)
            } catch (refreshError) {
                clearTokens()
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }

)

export { clearTokens, instance, setTokens };
