const API_KEY = '121d6ffb86379925f3c6f0ec13e53653';
const API_URL = 'https://api.themoviedb.org/3';

// Fetch movies from the API
export const fetchMovies = async (genreId = '', searchQuery = '') => {
  try {
    // URL parameters
    const genreParam = genreId ? `&with_genres=${genreId}` : '';
    const queryParam = searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : '';
    
    // Construct URL
    const url = `${API_URL}/discover/movie?api_key=${API_KEY}${genreParam}${queryParam}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch movies error:', error);
    return [];
  }
};

// Fetch genres from the API
export const fetchGenres = async () => {
  try {
    const url = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Fetch genres error:', error);
    return [];
  }
};







