import React, { useState } from 'react';
import { Product } from '../../interfaces/product/product.dto';
import { useToast } from '../ui/ToastProvider';

interface ProductDetailProps {
  product: Product;
  onFavorite?: () => void;
  isFavorite?: boolean;
  isAuthenticated?: boolean;
  showRemoveButton?: boolean; // Nuevo prop
  favMessage?: { text: string; type: 'success' | 'error' | null }; // Nuevo prop
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onFavorite, isFavorite, isAuthenticated, showRemoveButton, favMessage }) => {
  const [clicked, setClicked] = useState(false);
  const toast = useToast();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar a favoritos.');
      return;
    }
    setClicked(true);
    // Validación defensiva: no permitir favoritos si falta producto o handler
    if (!product || typeof onFavorite !== 'function') {
      setClicked(false);
      toast.error('Debes iniciar sesión para agregar a favoritos.');
      return;
    }
    onFavorite();
    setTimeout(() => setClicked(false), 800);
  };

  return (
    <div className="bg-white dark:bg-blue-950/80 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 border border-blue-200 dark:border-blue-800 transition-colors">
      <img src={product.image} alt={product.name} className="h-60 object-contain mb-2 rounded-lg border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30" />
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-200">{product.name}</h2>
        <p className="mb-1 text-blue-500/80 dark:text-blue-400">Precio: <span className="text-blue-700 font-bold dark:text-blue-300">${product.price} {product.currency}</span></p>
        <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors block mb-2">Ver en eBay</a>
        {typeof onFavorite === 'function' && product && (
          <div className="relative inline-block group mt-4">
            {/* Mostrar botón según showRemoveButton e isFavorite */}
            {showRemoveButton && isFavorite ? (
              <button
                type="button"
                onClick={handleClick}
                className={`flex items-center gap-2 !px-4 !py-2 !rounded-full font-semibold shadow-md border border-red-400 dark:border-red-700 transition-all duration-200 text-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400/60 bg-gradient-to-r from-red-500 to-red-400 text-white hover:from-red-600 hover:to-red-500 scale-[1.03] ${clicked ? 'ring-4 ring-red-300/40 animate-pulse' : ''}`}
                aria-pressed={isFavorite}
                aria-label="Quitar de favoritos"
                tabIndex={0}
                disabled={clicked || !product || !isAuthenticated}
              >
                <span className={`text-xl transition-transform duration-200 ${clicked ? 'animate-spin-slow' : ''}`} aria-hidden="true">★</span>
                <span className="sr-only md:not-sr-only">{clicked ? 'Procesando...' : 'Quitar de favoritos'}</span>
                {clicked && (
                  <span className="ml-2 w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin inline-block align-middle" aria-hidden="true"></span>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClick}
                className={`flex items-center gap-2 !px-4 !py-2 !rounded-full font-semibold shadow-md border border-blue-300 dark:border-blue-700 transition-all duration-200 text-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/60
                  ${isFavorite
                    ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-600 hover:to-blue-500 scale-[1.04]'
                    : 'bg-gradient-to-r from-blue-100 to-blue-300 text-blue-800 hover:from-blue-200 hover:to-blue-400 scale-[1.02]'}
                  ${clicked ? 'ring-4 ring-blue-300/40 animate-pulse' : ''}
                  ${!isAuthenticated ? 'opacity-60 cursor-not-allowed' : ''}
                `}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                tabIndex={0}
                disabled={clicked || !product || !isAuthenticated}
              >
                <span className={`text-xl transition-transform duration-200 ${clicked ? 'animate-spin-slow' : ''}`} aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
                <span className="sr-only md:not-sr-only">{clicked ? 'Procesando...' : isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>
                {clicked && (
                  <span className="ml-2 w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin inline-block align-middle" aria-hidden="true"></span>
                )}
              </button>
            )}
            {!isAuthenticated && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-blue-900 text-white text-xs rounded px-3 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                Inicia sesión para agregar a favoritos
              </div>
            )}
            {/* Mensaje de feedback debajo del botón */}
            {favMessage?.text && (
              <div className={`mt-3 text-center text-base font-semibold ${favMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{favMessage.text}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Tailwind custom animation (agregar en tu CSS global si no existe):
// .animate-spin-slow { animation: spin 1.2s linear infinite; }
