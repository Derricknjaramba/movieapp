import React, { useState } from 'react';

const MovieCard = ({ movie }) => {
  const [showFullSummary, setShowFullSummary] = useState(false);

  const truncateSummary = (text, length = 100) => {
    if (text.length <= length) return text;
    return `${text.substring(0, length)}...`;
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white">
      <img 
        className="w-full h-60 object-cover" 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base mb-2">
          {showFullSummary ? movie.overview : truncateSummary(movie.overview)}
        </p>
        <button
          onClick={() => setShowFullSummary(!showFullSummary)}
          className="text-blue-500 hover:text-blue-700 mt-2"
        >
          {showFullSummary ? 'Read Less' : 'Read More'}
        </button>
        <p className="text-gray-900 font-semibold mt-2">Rating: {movie.vote_average}</p>
        <p className="text-gray-500">Release Date: {movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;




































