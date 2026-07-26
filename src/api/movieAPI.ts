import { instance } from "./axiosInstance"

export const moviesAPI = {
    getMovies() {
        return instance.get<GetAllMovies[]>('/')
    },
    createMovie(title: string, year: number) {
        return instance.post<MovieType>('/movies', { title, year })
    }
}


export interface MovieType {
    id: number;
    title: string;
    year: number;
}

export interface GetAllMovies {
    id: number;
    title: string;
    year: number;
}
