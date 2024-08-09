// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for movies..."
      className="p-2 border border-gray-300 rounded-lg w-full"
    />
  );
};

export default SearchBar;



