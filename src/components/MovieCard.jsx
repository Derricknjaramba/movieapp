// src/components/MovieCard.js
import React from 'react';

const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date, overview, vote_average } = movie;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <img
        className="w-full h-48 object-cover"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 mb-2">{release_date}</p>
        <p className="text-gray-800 mb-2">{overview.length > 150 ? `${overview.substring(0, 150)}...` : overview}</p>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">⭐</span>
          <span className="font-semibold">{vote_average}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;



