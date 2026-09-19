import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { authAPI } from './api/authAPI';
import type { movieItem } from './api/movieAPI';
import './App.css';
import { CreateMovieAsync } from './components/CreateMovie/CreateMovie.async';
import { LoginAsync } from './components/Login/Login.async';
import { MainPageAsync } from './components/MainPage/MainPage.async';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { RegisterAsync } from './components/Register/Register.async';

function App() {
  const [movies, setMovies] = useState<movieItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()

  const logoutHandler = () => {
    authAPI.logout()
  }

  const toMainPageHandler = () => navigate('/')

  return (
    <>
      <div>Hello</div>
      <Routes>
        <Route path='/login' element={<LoginAsync />} />
        <Route path='/register' element={<RegisterAsync />} />
        <Route path='/' element={
          <ProtectedRoute>
            <MainPageAsync movies={movies} setMovies={setMovies} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages} />
          </ProtectedRoute>
        }
        />
        <Route path='/movie' element={
          <ProtectedRoute>
            <button onClick={toMainPageHandler}> To the main page</button>
            <CreateMovieAsync movies={movies} setMovies={setMovies} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages} />
          </ProtectedRoute>
        } />
      </Routes>
      <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default App;