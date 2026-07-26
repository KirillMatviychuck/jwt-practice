import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/authAPI";
import { setTokens } from "../../api/tokenStorage";

export const Login = () => {
    const navigate = useNavigate()
    const [state, setState] = useState<string>('')
    const sendRequest = async (email: string, password: string) => {
        try {
            const response = await authAPI.login(email, password)
            console.log(response)
            const { accessToken, refreshToken } = response.data
            setTokens(accessToken, refreshToken)
            navigate('/movie')
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setState(err.response?.data ?? 'Login failed');
            } else {
                console.log(err)
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
            <div>LOGIN</div>
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
                <button type="submit">Log In</button>
            </form>
            <div>
                <div>Status</div>
                <div>{state}</div>
            </div>
        </div>
    )
}
