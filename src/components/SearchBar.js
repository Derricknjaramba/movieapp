import React from 'react';

const SearchBar = ({ query, onQueryChange }) => {
  return (
    <input
      type="text"
      placeholder="Search for movies..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      className="border p-2 rounded mb-4 w-full"
    />
  );
};

export default SearchBar;























































