import React, { useState, useEffect, useRef } from 'react';
import LockScreen from './components/LockScreen';
import NavigationHeader from './components/NavigationHeader';
import NavigationFooter from './components/NavigationFooter';
import FloatingDecor from './components/FloatingDecor';
import WelcomeChapter from './chapters/WelcomeChapter';
import LetterChapter from './chapters/LetterChapter';
import PlayChapter from './chapters/PlayChapter';
import AtmChapter from './chapters/AtmChapter';
import CutCakeChapter from './chapters/CutCakeChapter';
import AcceptGiftChapter from './chapters/AcceptGiftChapter';
import { birthdayConfig } from './config/birthdayConfig';

const PAGES = [
  'Welcome',
  'Letter',
  'Play',
  'Memory ATM',
  'Cut Cake',
  'Accept Gift',
];

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef(null);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bdy_unlocked_site');
      if (saved === 'true') {
        setUnlocked(true);
      }
    } catch (e) {
      console.warn('Could not read localStorage:', e);
    }
  }, []);

  // Audio initialization
  useEffect(() => {
    const audio = new Audio(birthdayConfig.music.src);
    audio.loop = true;
    audio.volume = 0.65;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleToggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingMusic) {
      audio.pause();
      setIsPlayingMusic(false);
    } else {
      audio.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const handleUnlock = () => {
    setUnlocked(true);
    // Start music on first user unlock interaction
    if (audioRef.current && !isPlayingMusic) {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(() => {});
    }
  };

  const handleSelectPage = (index) => {
    setCurrentPage(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentPage < PAGES.length - 1) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setCurrentPage(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!unlocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="experience-shell">
      <FloatingDecor />

      <NavigationHeader
        currentPage={currentPage}
        totalPages={PAGES.length}
        pages={PAGES}
        onSelectPage={handleSelectPage}
        isPlaying={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
      />

      <main className="bdy-main-content" style={{ minHeight: '75vh', padding: '16px 12px' }}>
        {currentPage === 0 && <WelcomeChapter onNext={handleNext} />}
        {currentPage === 1 && <LetterChapter onNext={handleNext} />}
        {currentPage === 2 && <PlayChapter onNext={handleNext} />}
        {currentPage === 3 && <AtmChapter onNext={handleNext} />}
        {currentPage === 4 && <CutCakeChapter onNext={handleNext} />}
        {currentPage === 5 && <AcceptGiftChapter onRestart={handleRestart} />}
      </main>

      <NavigationFooter
        currentPage={currentPage}
        totalPages={PAGES.length}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}

