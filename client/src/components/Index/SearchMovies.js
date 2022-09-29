import React, { useState } from "react";
import Select from "react-select";
import axios from "lib/axios";

const SearchMovies = ({ setMovies }) => {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState(null);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = `/api/movies/search?search=${search}`;
      if (year != null) {
        url += `&year=${year}`;
      }
      const response = await axios.get(url);
      setMovies(response.data.data.movies);
      console.log(response.data.data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  const getYears = () => {
    const years = [];
    years.push({ label: "---", value: null });
    for (let i = new Date().getFullYear() + 2; i > 1880; i--) {
      years.push({ label: i, value: i });
    }

    return years;
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="row p-3">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <Select
            options={getYears()}
            onChange={(e) => setYear(e.value)}
            placeholder="Year"
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100">Search</button>
        </div>
      </div>
    </form>
  );
};

export default SearchMovies;
