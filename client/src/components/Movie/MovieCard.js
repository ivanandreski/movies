import React from "react";

import AddMovieToCategory from "../Index/AddMovieToCategory";
import ChangeStatus from "./ChangeStatus";
import "./style.css";

const MovieCard = ({ movie, isUsers }) => {
  const renderButtons = () => {
    if (isUsers) {
      return (
        <>
          <ChangeStatus movie={movie} />
          <span className="inline-block download bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2">
            <a
              className="text-decoration-none text-black"
              href={`https://rarbgprx.org/torrents.php?search=${movie.imdbID}&order=seeders&by=DESC`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </span>
        </>
      );
    }
  };

  return (
    <>
      <div className="card p-3" style={{ height: "48em" }}>
        <img
          className=""
          src={movie.Poster || movie.poster}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {movie.title || movie.Title}
          </div>
        </div>
        <div className="px-6 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2">
            {movie.year || movie.Year}
          </span>
          <span className="inline-block bg-yellow-500 rounded-full px-3 py-1 font-semibold mr-2 mb-2">
            <a
              className="text-decoration-none text-black"
              href={`https://www.imdb.com/title/${movie.imdbID}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Imdb
            </a>
          </span>
          {renderButtons()}
          <AddMovieToCategory movie={movie} />
        </div>
      </div>
    </>
  );
};

export default MovieCard;
