import Error from "components/Error/Error";
import Loader from "components/Loader/Loader";
import MovieCard from "components/MovieCard/MovieCard";
import Radio from "components/Radio/Radio";
import RadioItem from "components/Radio/RadioItem";
import { withMoviesSlice } from "services/withMoviesSlice";
import "./HomePage.css";
import { filterArray } from "./constants";

export const HomePage = ({ movies, status, error, onChangeFilter }) => {

  let content;

  if (movies) {
    content = movies?.map((movie, index) => (
      <MovieCard key={`${movie.id}-${index}`} movie={movie} />
    ));
  } else {
    content = "There is no movies to display";
  }

  if (status === 'failed') {
    content = <Error error={error} />
  }

  return (
    <div className="page-container">
      <div className="sticky-controllers">
        <Radio>
          {filterArray.map((filterName, index) => {
            return <RadioItem
              key={filterName}
              defaultChecked={index === 0}
              filterName={filterName}
              onChange={() => onChangeFilter(filterName)}
            />
          })}
        </Radio>
      </div>
      <section className="card-container">
        {content}
        <div>
          {status === 'loading' && <Loader />}
        </div>
      </section>
    </div>
  )
}

const HomePageWithMovieSlice = withMoviesSlice(HomePage);

export const HomePageWithMovieSlice;