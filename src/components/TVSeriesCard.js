// TVSeriesCard.js
import React, { useState, useEffect } from 'react';

const TVSeriesCard = ({ tvShow, onPlayTrailer }) => {
  const { name, poster_path, first_air_date, overview, vote_average, id } = tvShow;
  const [trailer, setTrailer] = useState(null);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=57b7b505b10ea5b66433d3ae8ceb0ad1`);
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
    if (trailer) {
      onPlayTrailer(trailer.key);
    }
  };

  const handleToggleOverview = () => {
    setIsOverviewExpanded(!isOverviewExpanded);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <img
        className="w-full h-48 object-cover"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={name}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-gray-600 mb-2">{first_air_date}</p>
        <p className="text-gray-800 mb-2">
          {isOverviewExpanded ? overview : `${overview.substring(0, 150)}...`}
        </p>
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleToggleOverview}
            className="text-blue-500 underline"
          >
            {isOverviewExpanded ? 'Show Less' : 'Show More'}
          </button>
          {trailer && (
            <button
              onClick={handlePlayTrailer}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Watch Trailer
            </button>
          )}
        </div>
        <div className="flex items-center mb-2 mt-2">
          <span className="text-yellow-500 mr-1">⭐</span>
          <span className="font-semibold">{vote_average}</span>
        </div>
      </div>
    </div>
  );
};

export default TVSeriesCard;


















