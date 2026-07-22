import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { MainPage } from './components/MainPage/MainPage'
import { CreateMovie } from './components/CreateMovie/CreateMovie'
import { accessToken, authAPI, refreshToken } from './api/axiosInstance'

function App() {
  console.log('Access token: ', accessToken)
  console.log('Refresh token: ', refreshToken)
  const logoutHandler = () => {
    authAPI.logout()
  }
  return (
    <>
      <div>Hello</div>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/movie' element={<CreateMovie />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default App
