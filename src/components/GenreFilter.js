import React from 'react';

const GenreFilter = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <select
      value={selectedGenre}
      onChange={(e) => onGenreChange(e.target.value)}
      className="border p-2 rounded mb-4 w-full"
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default GenreFilter;







