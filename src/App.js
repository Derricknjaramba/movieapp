// src/App.js
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';

const API_KEY = 'dfcbec5875dee87bd4c5140b21c05eec';
const API_URL = `https://api.themoviedb.org/3`;
const GENRE_URL = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
const SEARCH_URL = `${API_URL}/discover/movie?api_key=${API_KEY}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch genres
    const fetchGenres = async () => {
      try {
        const response = await fetch(GENRE_URL);
        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        setError('Failed to fetch genres');
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    // Fetch movies based on selected genre and query
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      let url = `${SEARCH_URL}`;
      if (selectedGenre) {
        url += `&with_genres=${selectedGenre}`;
      }
      if (query) {
        url += `&query=${query}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, selectedGenre]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Movie Finder</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <div className="mt-4">
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default App;


