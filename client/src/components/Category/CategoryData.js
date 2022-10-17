import React, { useState, useEffect } from "react";
import axios from "lib/axios";

import MovieCard from "components/Movie/MovieCard";

const CategoryData = ({ category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `/api/categories/${category.id}/movies`;
        const response = await axios.get(url);
        setMovies(response.data.data.movies);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [category.id]);

  const renderMovies = () => {
    return movies?.map((movie, key) => (
      <React.Fragment key={key}>
        <div className="col-md-2">
          <MovieCard movie={movie} isUsers={true} />
        </div>
      </React.Fragment>
    ));
  };

  return <div className="row">{renderMovies()}</div>;
};

export default CategoryData;
