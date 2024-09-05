import React, { useState, useEffect } from 'react';
import AuthenticationForm from './components/AuthenticationForm';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import GenreFilter from './components/GenreFilter';
import { auth, signOut } from './firebaseConfig'; // Ensure these are correctly imported

const API_KEY = '7b49e7fcd0433cc86dce34f3001aa965';
const API_URL = 'https://api.themoviedb.org/3';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(''); // 'login' or 'register'

  useEffect(() => {
    // Check authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch genres from TMDb API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Fetch genres error:', error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies based on search query and selected genre
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = `${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
        if (selectedGenre) {
          url += `&with_genres=${selectedGenre}`;
        }
        if (searchQuery) {
          url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Fetch movies error:', error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [searchQuery, selectedGenre]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logout successful!');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movie Search App</h1>

      {!isAuthenticated ? (
        <div>
          {showAuthForm === 'login' || showAuthForm === 'register' ? (
            <AuthenticationForm setShowAuthForm={setShowAuthForm} />
          ) : (
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setShowAuthForm('login')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Login
              </button>
              <button
                onClick={() => setShowAuthForm('register')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 ml-auto"
          >
            Logout
          </button>
        </div>
      )}

      {isAuthenticated && (
        <div>
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
          <GenreFilter genres={genres} selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
          <MovieList movies={movies} />
        </div>
      )}
    </div>
  );
};

export default App;

















































































;



