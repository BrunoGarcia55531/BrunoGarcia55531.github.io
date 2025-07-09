import React from 'react';
import { FavoriteDTO } from '../../interfaces/favorite/favorite.dto';
import { useNavigate } from 'react-router-dom';

interface FavoriteListProps {
  favorites: FavoriteDTO[];
  onRemoveFavorite: (favoriteId: number) => void;
  showEbayButton?: boolean; // Nuevo prop opcional
}

export const FavoriteList: React.FC<FavoriteListProps> = ({ favorites, onRemoveFavorite, showEbayButton = true }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {favorites.map(fav => (
        <div
          key={fav.id}
          className="bg-white dark:bg-blue-950/80 rounded-2xl shadow-lg p-6 flex flex-col border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer hover:shadow-xl hover:scale-[1.02] duration-150"
          onClick={() => navigate(`/product/${fav.ebayItemId || fav.productId}`)}
        >
          <img src={fav.image || '/vite.svg'} alt={fav.title || 'Producto'} className="h-40 object-contain mb-2 rounded-lg border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30" />
          <h3 className="font-bold text-lg text-blue-900 dark:text-blue-200">{fav.title || 'Sin título'}</h3>
          <p className="text-blue-600/80 dark:text-blue-300 mb-1">{fav.condition}</p>
          <p className="text-blue-700 font-bold dark:text-blue-300 mb-2">
            ${fav.price} {fav.currency}
          </p>
          {showEbayButton && fav.url && (
            <a
              href={fav.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mb-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              onClick={e => e.stopPropagation()}
            >
              Ver en eBay
            </a>
          )}
          <button
            onClick={e => { e.stopPropagation(); onRemoveFavorite(fav.id); }}
            className="mt-auto flex items-center gap-2 !px-4 !py-2 !rounded-full font-bold shadow border transition-colors text-base bg-gradient-to-r from-red-500 to-red-400 text-white border-red-700 hover:from-red-600 hover:to-red-500 scale-[1.03]"
          >
            ★ Quitar de favoritos
          </button>
        </div>
      ))}
    </div>
  );
};
