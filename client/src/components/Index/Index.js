import React, { useState, useEffect } from "react";
import axios from "lib/axios";

import AppLayout from "components/Layouts/AppLayout";
import SearchMovies from "./SearchMovies";
import Movies from "../Movie/Movies";
import { UserCategoriesContext } from "../../context/UserCategoriesContext";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/api/users/categories`);
        setCategories(response.data.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <AppLayout>
      <UserCategoriesContext.Provider value={categories}>
        <div className="p-5">
          <h1 className="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Add a movie to your download lists
          </h1>
          <SearchMovies setMovies={setMovies} />
          <Movies movies={movies} />
        </div>
      </UserCategoriesContext.Provider>
    </AppLayout>
  );
};

export default Index;
