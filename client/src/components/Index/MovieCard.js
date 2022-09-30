import React, { useState } from "react";
import AddMovieToCategory from "./AddMovieToCategory";

const MovieCard = ({ movie, isUsers }) => {
  const renderButtons = () => {
    if (isUsers) {
      return (
        <>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2">
            Downloaded
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2">
            Watched
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2">
            {movie.status.name}
          </span>
        </>
      );
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-3">
      <img
        className="w-full"
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
        <AddMovieToCategory movie={movie} />
        {renderButtons()}
      </div>
    </div>
  );
};

export default MovieCard;
