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
      onPlayTrailer(trailer.key, 'tv');
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
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{first_air_date}</p>
        <p className="text-gray-800 mt-2">
          Rating: {vote_average ? vote_average.toFixed(1) : 'N/A'}
        </p>
        <div className="mt-2">
          <p className={`overflow-hidden ${isOverviewExpanded ? 'block' : 'truncate'}`}>
            {overview}
          </p>
          <button
            onClick={handleToggleOverview}
            className="text-blue-500 underline mt-2"
          >
            {isOverviewExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
        <button
          onClick={handlePlayTrailer}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
        >
          Watch Trailer
        </button>
      </div>
    </div>
  );
};

export default TVSeriesCard;























