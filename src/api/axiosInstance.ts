import axios from 'axios';


export interface GetAllMovies {
    id: number;
    title: string;
    year: number;
}
export interface MovieType {
    id: number;
    title: string;
    year: number;
}
type AccessToken = string;
type RefreshToken = string;

export let accessToken: AccessToken = '';
export let refreshToken: RefreshToken = '';


function setTokens(access: AccessToken, refresh: RefreshToken) {
    accessToken = access
    refreshToken = refresh
}

function clearTokens() {
    accessToken = ''
    refreshToken = ''
}

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

const authAPI = {
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
const moviesAPI = {
    getMovies() {
        return instance.get('/')
    },
    createMovie(title: string, year: number) {
        return instance.post<MovieType>('/movies', { title, year })
    }
}

export { authAPI, clearTokens, instance, moviesAPI, setTokens };
