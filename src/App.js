import React, { useState, useEffect } from 'react';
import AuthenticationForm from './components/AuthenticationForm';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import TVSeriesList from './components/TVSeriesList';
import GenreFilter from './components/GenreFilter';
import TrailerModal from './components/TrailerModal';
import { auth, signOut } from './firebaseConfig';

const API_KEY = '57b7b505b10ea5b66433d3ae8ceb0ad1';
const API_URL = 'https://api.themoviedb.org/3';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState('');
  const [currentTab, setCurrentTab] = useState('movies');
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

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

    if (currentTab === 'movies') {
      fetchMovies();
    }
  }, [searchQuery, selectedGenre, currentTab]);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        let url = `${API_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&first_air_date.gte=2024-09-01`;
        if (selectedGenre) {
          url += `&with_genres=${selectedGenre}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const sortedTVShows = data.results.sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));
        setTvShows(sortedTVShows);
      } catch (error) {
        console.error('Fetch TV shows error:', error);
        setTvShows([]);
      }
    };

    if (currentTab === 'tvShows') {
      fetchTVShows();
    }
  }, [selectedGenre, currentTab]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logout successful!');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handlePlayTrailer = (trailerKey) => {
    setTrailerKey(trailerKey);
  };

  const handleCloseTrailer = () => {
    setTrailerKey(null);
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setSearchQuery('');
    setSelectedGenre('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pixel's Movie and TV Show Search App</h1>

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
          <div className="flex mb-4">
            <button
              onClick={() => handleTabChange('movies')}
              className={`py-2 px-3 text-center ${currentTab === 'movies' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-l`}
            >
              Movies
            </button>
            <button
              onClick={() => handleTabChange('tvShows')}
              className={`py-2 px-3 text-center ${currentTab === 'tvShows' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-r`}
            >
              TV Shows
            </button>
          </div>

          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
          <GenreFilter genres={genres} selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />

          {currentTab === 'movies' && <MovieList movies={movies} onPlayTrailer={handlePlayTrailer} />}
          {currentTab === 'tvShows' && <TVSeriesList tvSeries={tvShows} onPlayTrailer={handlePlayTrailer} />}
        </div>
      )}

      {trailerKey && (
        <TrailerModal
          isOpen={!!trailerKey}
          onClose={handleCloseTrailer}
          trailerKey={trailerKey}
        />
      )}
    </div>
  );
};

export default App;

















































































































;



