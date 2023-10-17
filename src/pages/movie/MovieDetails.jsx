import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { actions as favoriteActions } from "../../features/favoritesSlice";
import "./MovieDetails.css";

export default function MovieDetails({ movie }) {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const addToFavorites = (id) => {
    if (!favorites.includes(id)) {
      const updatedFavorites = [...favorites, id];
      sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  let status;

  if (movie?.status === "Released") {
    status = <div className="status" style={{ backgroundColor: "green" }}>Released</div>;
  }

  const onAddFavorite = () => {
    addToFavorites(movie?.id);
    favoriteActions?.resetCounter();
  }

  return (
    <div className="single-movie-container" >
      <div className="image-container">
        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie?.poster_path}`} alt="movie poster"
          width="100%" height="100%" />
      </div>
      <div className="title-container">
        <div className="title-content">
          {status}
          <h3>{movie?.title}</h3>
        </div>

        <p>{movie?.tagline}</p>
      </div>
      <div className="overview-container">
        <p>{movie?.overview}</p>
        <Button className="btn" onClick={onAddFavorite}>ADD TO FAVORITE</Button>
      </div>
      <div className="genres-container">
        <ul className="genres">
          {movie?.genres.map((genre) => <li key={genre.name}>{genre.name}</li>)}
        </ul>
      </div>
      <div className="votes-container">
        {movie?.vote_average} / 10
      </div>
    </div>
  )
}
