import axios from "axios"
import { useEffect, useState } from "react"
import { moviesAPI, type movieItem } from "../../api/movieAPI"
import { Pagination } from "../Pagination/Pagination"


export const MainPage = () => {
    const [movies, setMovies] = useState<movieItem[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        async function getMovies() {
            try {
                const response = await moviesAPI.getMovies(currentPage, 5)
                setMovies(response.data.data)
                setTotalPages(response.data.totalPages)

            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log('Axios Error', err)
                } else {
                    console.log('Error', err)
                }

            }
        }
        getMovies()
    }, [currentPage])

    return (
        <>
            <div>
                {movies.map(movie => <div key={movie.id}>{movie.title}</div>)}
            </div>
            <Pagination changePageSetter={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />
        </>
    )
}
