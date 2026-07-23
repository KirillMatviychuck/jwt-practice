import axios from "axios"
import { useEffect, useState } from "react"
import { moviesAPI, type GetAllMovies } from "../../api/axiosInstance"

export const MainPage = () => {
    const [movies, setMovies] = useState<GetAllMovies[]>([])

    useEffect(() => {
        async function getAllMovies() {
            try {
                const response = await moviesAPI.getMovies()
                setMovies(response.data)

            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log('Axios Error', err)
                } else {
                    console.log('Error', err)
                }

            }
        }
        getAllMovies()
    }, [])

    return (
        <div>
            {movies.map(movie => <div key={movie.id}>{movie.title}</div>)}
        </div>
    )
}
