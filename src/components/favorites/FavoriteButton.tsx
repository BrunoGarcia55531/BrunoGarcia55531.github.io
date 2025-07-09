import React from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggle }) => (
  <button onClick={onToggle} aria-label="Favorito" className="text-xl">
    {isFavorite ? '❤️' : '🤍'}
  </button>
);
