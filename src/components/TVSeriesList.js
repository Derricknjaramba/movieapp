import React from 'react';
import TVSeriesCard from './TVSeriesCard';

const TVSeriesList = ({ tvSeries, onPlayTrailer }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tvSeries.map(tvShow => (
        <TVSeriesCard key={tvShow.id} tvShow={tvShow} onPlayTrailer={onPlayTrailer} />
      ))}
    </div>
  );
};

export default TVSeriesList;







