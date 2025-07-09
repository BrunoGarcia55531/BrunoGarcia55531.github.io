import React from 'react';
import { Product } from '../../interfaces/product/product.dto';

interface ProductCardProps {
  product: Product;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onFavorite, isFavorite }) => (
  <div className="bg-white dark:bg-blue-950/80 rounded-2xl shadow-lg p-6 flex flex-col border border-blue-200 dark:border-blue-800 transition-colors">
    <img src={product.image} alt={product.name} className="h-40 object-contain mb-2 rounded-lg border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30" />
    <h3 className="font-bold text-lg text-blue-900 dark:text-blue-200">{product.name}</h3>
    <p className="text-blue-600/80 dark:text-blue-300">{product.condition}</p>
    <p className="text-blue-700 font-bold dark:text-blue-300">${product.price} {product.currency}</p>
    {onFavorite && (
      <button
        onClick={e => { e.stopPropagation(); onFavorite(); }}
        className={`mt-2 flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow border transition-colors text-base
          ${isFavorite
            ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white border-blue-700 hover:from-blue-700 hover:to-blue-500 scale-[1.03]'
            : 'bg-gradient-to-r from-blue-200 to-blue-400 text-blue-800 border-blue-400 hover:from-blue-300 hover:to-blue-500 scale-[1.03]'}
        `}
      >
        {isFavorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
    )}
  </div>
);
