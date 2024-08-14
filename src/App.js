import React, { useEffect, useState } from 'react';
import GenreFilter from './components/GenreFilter';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import { fetchMovies, fetchGenres } from './api';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch genres on component mount
  useEffect(() => {
    const fetchData = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    fetchData();
  }, []);

  // Fetch movies whenever the genre or search query changes
  useEffect(() => {
    const fetchMoviesData = async () => {
      console.log('Fetching movies with:', { selectedGenre, searchQuery });
      const moviesData = await fetchMovies(selectedGenre, searchQuery);
      console.log('Fetched movies:', moviesData);
      setMovies(moviesData);
    };
    fetchMoviesData();
  }, [selectedGenre, searchQuery]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movie App</h1>
      <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
      <GenreFilter genres={genres} selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
      <MovieList movies={movies} />
    </div>
  );
};

export default App;


















































;



