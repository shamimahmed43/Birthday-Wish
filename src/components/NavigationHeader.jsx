import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function NavigationHeader({ currentPage, totalPages, pages, onSelectPage, isPlaying, onToggleMusic }) {
  return (
    <header className="bdy-header">
      <div className="bdy-nav" id="bdy-nav">
        {pages.map((pageTitle, index) => {
          const isActive = index === currentPage;
          return (
            <button
              key={index}
              className={`bdy-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPage(index)}
              aria-label={`Go to ${pageTitle}`}
            >
              <span>{index + 1}</span>
              <small>{pageTitle}</small>
            </button>
          );
        })}
      </div>

      <button
        className={`bdy-music-btn ${isPlaying ? 'playing' : ''}`}
        id="music-button"
        onClick={onToggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <>
            <Volume2 size={18} />
            <span>Now playing {birthdayConfig.music.title}</span>
          </>
        ) : (
          <>
            <VolumeX size={18} />
            <span>Play {birthdayConfig.music.title}</span>
          </>
        )}
      </button>
    </header>
  );
}

