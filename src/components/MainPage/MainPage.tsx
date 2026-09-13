import axios from "axios"
import { useEffect, useState } from "react"
import { moviesAPI, type movieItem } from "../../api/movieAPI"
import { Pagination } from "../Pagination/Pagination"
import SingleMovieSkeleton from "../SingleMovieSkeleton/SingleMovieSkeleton"


export const MainPage = () => {
    const [movies, setMovies] = useState<movieItem[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getMovies() {
            try {
                setIsLoading(true)
                const response = await moviesAPI.getMovies(currentPage, 5)
                setMovies(response.data.data)
                response.data.totalPages && setTotalPages(response.data.totalPages)

            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log('Axios Error', err)
                } else {
                    console.log('Error', err)
                }

            } finally {
                setIsLoading(false)
            }
        }
        getMovies()
    }, [currentPage])

    if (isLoading) {
        return <SingleMovieSkeleton />
    }

    return (
        <>
            <div>
                {movies.map(movie => <div key={movie.id}>{movie.title}</div>)}
            </div>
            <Pagination changePageSetter={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />
        </>
    )
}
