// MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onPlayTrailer }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onPlayTrailer={onPlayTrailer} // Ensure this prop is passed
        />
      ))}
    </div>
  );
};

export default MovieList;































