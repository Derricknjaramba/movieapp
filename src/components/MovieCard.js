import React, { useState, useEffect } from 'react';
import TrailerModal from './TrailerModal';

const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date, overview, vote_average, id } = movie;
  const [trailer, setTrailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=7b49e7fcd0433cc86dce34f3001aa965`);
        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer');
        setTrailer(trailer);
      } catch (err) {
        console.error('Failed to fetch trailer', err);
      }
    };

    fetchTrailer();
  }, [id]);

  const handlePlayTrailer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <img
        className="w-full h-48 object-cover"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 mb-2">{release_date}</p>
        <p className="text-gray-800 mb-2">{overview.length > 150 ? `${overview.substring(0, 150)}...` : overview}</p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">⭐</span>
          <span className="font-semibold">{vote_average}</span>
        </div>
        {trailer && (
          <button
            onClick={handlePlayTrailer}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Watch Trailer
          </button>
        )}
      </div>
      {trailer && (
        <TrailerModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          trailerKey={trailer.key}
        />
      )}
    </div>
  );
};

export default MovieCard;
























































