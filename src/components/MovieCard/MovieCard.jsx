
import { useNavigate } from 'react-router-dom';
import { DETAILS_PATH } from "routes/routes.constants";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(DETAILS_PATH.replace(':id', movie.id), { state: { movie } });
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="content">
        <div className="back">
          <div className="back-content">
            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt="Lamp" width="100%" height="100%" />
          </div>
        </div>
        <div className="front">

          <div className="img">
            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt="Lamp" width="100%" height="100%" />
          </div>

          <div className="front-content">
            <div className="description">

              <p className="title">
                <strong>{movie.title}</strong>
              </p>

              <p className="card-footer">
                {movie.release_date} &nbsp; | &nbsp; {movie.vote_average}/10
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
