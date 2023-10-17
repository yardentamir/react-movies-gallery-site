import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import { fetchMovie, selectMovie } from "../../features/movieSlice";
import MovieDetails from "./MovieDetails";
import "./MoviePage.css";

export default function MoviePage() {

  const dispatch = useDispatch();
  const { id } = useParams();

  const { movie } = useSelector(selectMovie);
  const { status, error } = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(fetchMovie(id));
  }, [dispatch, id]);

  let content;

  if (status === 'loading') {
    content = <div style={{ margin: "0 auto" }}><Loader /></div>
  } else if (status === 'succeeded') {
    content = <MovieDetails movie={movie} />

  } else if (status === 'failed') {
    content = <Error error={error} />
  }

  return (
    <div className="movie-page-container">
      <h2>Movie Details</h2>
      {content}
    </div>

  )
}
