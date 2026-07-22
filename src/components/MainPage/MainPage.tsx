import { Navigate } from "react-router-dom"
import { authAPI, moviesAPI, type GetAllMovies } from "../../api/axiosInstance"
import { useEffect, useState } from "react"
import axios from "axios"

export const MainPage = () => {
    const [movies, setMovies] = useState<GetAllMovies[]>([])
    const isLoggedIn = authAPI.isLoggedIn()

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

    if (!isLoggedIn) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <div>
            {movies.map(movie => <div key={movie.id}>{movie.title}</div>)}
        </div>
    )
}
