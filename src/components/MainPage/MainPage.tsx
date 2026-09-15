import axios from "axios"
import { useEffect, type FC } from "react"
import { moviesAPI, type movieItem } from "../../api/movieAPI"
import { Pagination } from "../Pagination/Pagination"


const MainPage: FC<MainPageProps> = ({ currentPage, movies, setCurrentPage, setMovies, setTotalPages, totalPages }) => {

    useEffect(() => {
        async function getMovies() {
            try {
                const response = await moviesAPI.getMovies(currentPage, 5)
                setMovies(response.data.data)
                response.data.totalPages && setTotalPages(response.data.totalPages)
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

interface MainPageProps {
    movies: movieItem[];
    currentPage: number;
    totalPages: number;
    setMovies: React.Dispatch<React.SetStateAction<movieItem[]>>
    setCurrentPage: (page: number) => void
    setTotalPages: (totalPages: number) => void
}

export default MainPage;