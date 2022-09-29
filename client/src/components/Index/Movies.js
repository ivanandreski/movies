import React from "react";

import MovieCard from "./MovieCard";

const Movies = ({ movies }) => {
  const renderMovies = () => {
    return movies?.map((movie, key) => (
      <div key={key} className="col-md-3 p-3">
        <MovieCard movie={movie} />
      </div>
    ));
  };

  return <div className="row p-2">{renderMovies()}</div>;
};

export default Movies;
