import React from 'react';
import { Product } from '../../interfaces/product/product.dto';
import { ProductCard } from './ProductCard';

function generateFrontendId(product: Product, index: number): number {
  // Si el id es numérico, úsalo. Si es string, genera uno único basado en el string y el índice
  if (!isNaN(Number(product.id))) return Number(product.id);
  // Hash simple para string (no reversible, pero único para la sesión)
  let hash = 0;
  for (let i = 0; i < product.id.length; i++) {
    hash = ((hash << 5) - hash) + product.id.charCodeAt(i);
    hash |= 0; // Convierte a 32 bits
  }
  // Suma el índice para evitar colisiones en la sesión
  return Math.abs(hash) + index;
}

interface ProductListProps {
  products: Product[];
  onFavorite?: (id: string) => void;
  onProductClick?: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onFavorite, onProductClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {products.map((product, idx) => (
      <div key={generateFrontendId(product, idx)} onClick={() => onProductClick?.(product.id)} className={onProductClick ? 'cursor-pointer' : ''}>
        <ProductCard product={product} onFavorite={onFavorite ? () => onFavorite(product.id) : undefined} />
      </div>
    ))}
  </div>
);
