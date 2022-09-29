import React, { useState, useEffect } from "react";
import axios from "lib/axios";

const CategoryData = ({ category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `/api/categories/${category.id}/movies`;
        const response = await axios.get(url);
        setMovies(response.data.movies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [category.id]);

  return (
    <div className="">
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
      richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
      anderson cred nesciunt sapiente ea proident.
    </div>
  );
};

export default CategoryData;
