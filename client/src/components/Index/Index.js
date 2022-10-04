import React, { useState } from "react";

import AppLayout from "components/Layouts/AppLayout";
import SearchMovies from "./SearchMovies";
import Movies from "../Movie/Movies";

const Index = () => {
  const [movies, setMovies] = useState([]);

  return (
    <AppLayout>
      <div className="p-5">
        <h1 className="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Add a movie to your download lists
        </h1>
        <SearchMovies setMovies={setMovies} />
        <Movies movies={movies} />
      </div>
    </AppLayout>
  );
};

export default Index;
