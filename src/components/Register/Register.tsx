import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { authAPI, setTokens } from "../../api/axiosInstance"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const [state, setState] = useState<string>('')
    const navigate = useNavigate()
    const sendRequest = async (email: string, password: string) => {
        try {
            const response = await authAPI.register(email, password)
            const { accessToken, refreshToken } = response.data
            setTokens(accessToken, refreshToken)
            navigate('/login')
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setState(err.response?.data ?? 'Register failed');
            } else {
                setState('Something went wrong');
            }
        }


    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate(values) {
            const errors: { email?: string; password?: string } = {};
            if (!values.email) errors.email = 'Email is required';
            if (!values.password) errors.password = 'Enter your password';
            return errors;
        },
        onSubmit: values => {
            const payload = {
                email: values.email,
                password: values.password,
            }
            sendRequest(payload.email, payload.password)
        },
    });
    return (
        <div>
            <div>REGISTER</div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                <label htmlFor="password" />
                <input
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                <button type="submit">Register</button>
            </form>
            <div>
                {state}
            </div>
        </div>
    )
}
