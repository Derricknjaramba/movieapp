import React from 'react';

const SearchBar = ({ query, onQueryChange }) => {
  const handleChange = (e) => {
    onQueryChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search for movies or TV shows..."
      value={query}
      onChange={handleChange}
      className="border p-2 rounded mb-4 w-full"
    />
  );
};

export default SearchBar;



























































