import { instance } from "./axiosInstance"

export const moviesAPI = {
    getMovies(page?: number, limit?: number) {
        return instance.get<GetMoviesResponse>('/', { params: { page, limit } })
    },
    createMovie(title: string, year: number) {
        return instance.post<MovieType>('/movies', { title, year })
    },
    addMoviePoster(id: number, file: File) {
        const formData = new FormData();
        formData.append('file', file);

        return instance.post<AddMoviePosterResponse>(`/movies/${id}/poster`, formData)
    }
}


export interface MovieType {
    id: number;
    title: string;
    year: number;
}

export interface GetMoviesResponse {
    data: MovieType[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

interface MovieWithPoster extends MovieType {
    moviePoster: string;
}

interface AddMoviePosterResponse {
    response: MovieWithPoster;
}