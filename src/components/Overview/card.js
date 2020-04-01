import React from 'react';
import Moment from 'moment';

const Card = ({ arc, episode, onClick }) => {
  const containerClassName = `progress-card title ${
    episode.in_progress ? 'unreleased' : ''
  }`;
  const episodeTitle = episode.part
    ? `${arc.title} ${episode.part.toString().padStart(2, '0')}`
    : episode.title;

  return (
    <div
      className={containerClassName}
      onClick={episode.in_progress ? null : onClick}
    >
      <div className="text">
        {episodeTitle}
        {episode.in_progress ? ' (TBA)' : ''}
      </div>
      {episode.title && episode.part && (
        <div className="status">“{episode.title}”</div>
      )}
      {!episode.in_progress && episode.released_date && (
        <div className="status">
          {Moment(episode.released_date, 'YYYY-MM-DD HH:mm:ss').format(
            'MMMM D, YYYY',
          )}
        </div>
      )}
      {episode.chapters && episode.episodes && (
        <div className="status">
          Ch. {episode.chapters} / Ep. {episode.episodes}
        </div>
      )}
      {episode.chapters && !episode.episodes && (
        <div className="status">Chapter {episode.chapters}</div>
      )}
      {!episode.chapters && episode.episodes && (
        <div className="status">Episode {episode.episodes}</div>
      )}
    </div>
  );
};

export default Card;
