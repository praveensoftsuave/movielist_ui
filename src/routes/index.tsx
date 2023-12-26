import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Login';
import MoviesPage from '../pages/Movies';
import { useContext } from 'react';
import CreateEditMoviePage from '../pages/CreateEditMovie';
import { useUserContext } from '../context/userContext';
import { paths } from './constant';

function Router() {
    const { isAuthenticated } = useUserContext()   
    return (
        <BrowserRouter>
            {isAuthenticated ?
                <Routes>
                    <Route path="/" element={<MoviesPage />} />
                    <Route path="/movie" element={<MoviesPage />} />
                    <Route path="/movie/create" element={<CreateEditMoviePage />} />
                    <Route path="/movie/edit/:movieId" element={<CreateEditMoviePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                :
                <Routes>
                    <Route path="/" element={<Navigate to={paths.login}/>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            }
        </BrowserRouter>
    );
}

export default Router;
