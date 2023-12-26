import React, { useEffect, useState } from "react";
import "./styles.scss";
import { AuthService } from "../../services/movieService";
import AddIcon from "../../assets/images/add.svg";
import LogoutIcon from "../../assets/images/logout.svg";
import { useNavigate } from "react-router-dom";
import PaginationRounded from "./pagination";
import NoMovies from "./NoMovies";
import spinner from "../../assets/images/spinner.gif"
import { useUserContext } from "../../context/userContext";
import MovieCard from "./movieCard";

function Movies() {
  const MovieListService = new AuthService();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useUserContext()
  const [movieList, setMovieList] = useState<any>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovieList = async () => {
    setLoading(true)
    const getList = await MovieListService.getMovieList();
    if (getList?.success) {
      setMovieList(getList?.data);
      setTotalPages(Math.ceil(+(getList?.totalCount / +8)));
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    localStorage.clear();
    setIsAuthenticated("")
    navigate("/login");
  };

  const handlePagination = async (number: number) => {
    setLoading(true);
    if (number > page) {
      const getList = await MovieListService.getMovieListPagination(
        "lastItem",
        movieList[movieList.length - 1]?.movieId
      );
      if (getList?.success === true) {
        setMovieList(getList?.data);
        setTotalPages(Math.ceil(+(getList?.totalCount / +8)));
      }
      setPage(number);
    }
    if (number < page) {
      const getList = await MovieListService.getMovieListPagination(
        "firstItem",
        movieList[0]?.movieId
      );
      if (getList?.success === true) {
        setMovieList(getList?.data);
        setTotalPages(Math.ceil(+(getList?.totalCount / +8)));
      }
      setPage(number);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  return (

    <div className="movies">
          <div className="movie-list-header">
            <div >
              <h2>My movies</h2>
              <img className="clickable" alt="Add New Icon" src={AddIcon} draggable="false" onClick={() => navigate("/movie/create")} />
            </div>
            <div onClick={() => handleLogout()}>
              <p>Logout</p>
              <img className="clickable" alt="Logout Icon" src={LogoutIcon} draggable="false" />
            </div>
          </div>
          <div className={(!loading && movieList?.length) ? "movies-list-container": "movies-list-loader"}>
            {loading ? <img src={spinner} alt="spinner" className="spinner"/> : <>
            {movieList?.length ? movieList?.map((movie: any, index: any) => {
              return <MovieCard key={index} data={movie} />;
            }): <NoMovies />}
            </>}
          </div>
          <div className="pagination">
          <PaginationRounded
            page={totalPages}
            shape="rounded"
            pagination={(e: any, number: number) => handlePagination(number)}
          />
          </div>
        </div>
  );
}

export default Movies;
