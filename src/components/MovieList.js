import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.length > 0 ? (
        movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <p className="col-span-full text-center text-gray-500">No movies found</p>
      )}
    </div>
  );
};

export default MovieList;





























