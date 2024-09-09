import React from 'react';

const SearchBar = ({ query, onQueryChange }) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search..."
      className="w-full p-2 border border-gray-300 rounded"
    />
  );
};

export default SearchBar;




























































