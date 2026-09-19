import axios from "axios"
import { useFormik } from "formik"
import { startTransition, useEffect, useOptimistic, type FC } from "react"
import { moviesAPI, type MovieType } from "../../api/movieAPI"
import { Pagination } from "../Pagination/Pagination"
import { PosterUpload } from "../AddMovie/PosterUpload"
import cls from './CreateMovie.module.css'

const CreateMovie: FC<CreateMovieProps> = ({ currentPage, movies, setCurrentPage, setMovies, setTotalPages, totalPages }) => {
    const [optimisticMovies, addOptimisticMovie] = useOptimistic(
        movies,
        (currentMovies: MovieType[], movie: MovieType) => [
            ...currentMovies,
            movie
        ]
    );

    useEffect(() => {
        async function getMovies() {
            try {
                const response = await moviesAPI.getMovies(currentPage, 5)
                setMovies(response.data.data)
                console.log(response.data.data)
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

    const createMovie = async (title: string, year: number) => {
        startTransition(async () => {
            try {

                addOptimisticMovie({ id: Date.now(), title, year });
                const response = await moviesAPI.createMovie(title, year)
                setMovies(prev => [...prev, response.data])


            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    console.log(err)
                } else {
                    console.log(err)
                }
            }
        })
    }
    const formik = useFormik({
        initialValues: {
            title: '',
            year: '',
        },
        validate(values) {
            const errors: { title?: string; year?: string } = {};
            if (!values.title) errors.title = 'Title is required';
            if (!values.year) errors.year = 'Year is required';
            return errors;
        },
        onSubmit: values => {
            const payload = {
                title: values.title,
                year: Number(values.year),
            }
            createMovie(payload.title, payload.year)
        },
    });
    return (
        <div>
            <div>Create movie note</div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"

                    {...formik.getFieldProps('title')}
                />
                <label htmlFor="year" />
                <input
                    type="number"
                    {...formik.getFieldProps('year')}
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <div>Status</div>
                <div style={{ color: 'crimson' }}>
                    {formik.errors.title && <div>{formik.errors.title}</div>}
                    {formik.errors.year && <div>{formik.errors.year}</div>}
                </div>
            </div>
            <div className={cls.movieBlock}>
                {optimisticMovies.map(movie => (
                    <div key={movie.id} className={cls.movieWrapper}>
                        <div className={cls.movieTitle}>{movie.title}</div>
                        <PosterUpload movieId={movie.id} title={movie.title} />
                    </div>
                ))}
                <Pagination changePageSetter={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />

            </div>

        </div>
    )
}


interface CreateMovieProps {
    movies: MovieType[];
    currentPage: number;
    totalPages: number;
    setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>
    setCurrentPage: (page: number) => void
    setTotalPages: (totalPages: number) => void
}

export default CreateMovie;
