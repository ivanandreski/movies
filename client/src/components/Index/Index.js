import React, { useState } from "react";

import AppLayout from "components/Layouts/AppLayout";
import SearchMovies from "./SearchMovies";
import Movies from "../Movie/Movies";

const Index = () => {
  const [movies, setMovies] = useState([]);

  return (
    <AppLayout>
      <div className="p-5">
        <SearchMovies setMovies={setMovies} />
        <Movies movies={movies} />
      </div>
    </AppLayout>
  );
};

export default Index;
