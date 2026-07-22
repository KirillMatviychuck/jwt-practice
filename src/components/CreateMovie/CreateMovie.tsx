import axios from "axios"
import { useFormik } from "formik"
import { moviesAPI } from "../../api/axiosInstance"

export const CreateMovie = () => {
    // const [state, setState] = useState<MovieType | null>(null)
    const createMovie = async (title: string, year: number) => {
        try {
            const response = await moviesAPI.createMovie(title, year)
            console.log(response)
            console.log(response)
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.log(err)
            } else {
                console.log(err)
            }
        }


    }
    const formik = useFormik({
        initialValues: {
            title: '',
            year: '',
        },
        validate(values) {
            const errors: { email?: string; password?: string } = {};
            if (!values.title) errors.email = 'Title is required';
            if (!values.year) errors.password = 'Year is required';
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
                    type="title"
                    {...formik.getFieldProps('title')}
                />
                <label htmlFor="year" />
                <input
                    type="year"
                    {...formik.getFieldProps('year')}
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <div>Status</div>
                <div></div>
            </div>
        </div>
    )
}
