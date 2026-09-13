import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CreateMovie } from './components/CreateMovie/CreateMovie';
import { Login } from './components/Login/Login';
import { MainPage } from './components/MainPage/MainPage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Register } from './components/Register/Register';
import { authAPI } from './api/authAPI';

function App() {
  const navigate = useNavigate()

  const logoutHandler = () => {
    authAPI.logout()
  }

  const toMainPageHandler = () => navigate('/')

  return (
    <>
      <div>Hello</div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
        />
        <Route path='/movie' element={
          <ProtectedRoute>
            <button onClick={toMainPageHandler}> To the main page</button>
            <CreateMovie />
          </ProtectedRoute>
        } />
      </Routes>
      <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default App
