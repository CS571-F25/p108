import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ArtistPage from './components/ArtistPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  const handleArtistClick = (artistId) => {
    setSelectedArtistId(artistId);
    setCurrentPage('artist');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedArtistId(null);
  };

  return (
    <div>
      {currentPage === 'home' && <HomePage onArtistClick={handleArtistClick} />}
      {currentPage === 'artist' && <ArtistPage artistId={selectedArtistId} onBack={handleBackToHome} />}
    </div>
  );
}