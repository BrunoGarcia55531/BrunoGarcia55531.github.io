import React from 'react';
import { Product } from '../../interfaces/product/product.dto';

interface ComparisonTableProps {
  products: Product[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ products }) => (
  <table className="min-w-full border-separate border-spacing-0 mt-4 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800">
    <thead className="bg-blue-100 dark:bg-blue-900/40">
      <tr>
        <th className="border-b border-blue-200 dark:border-blue-800 px-4 py-2 text-blue-900 dark:text-blue-200">Imagen</th>
        <th className="border-b border-blue-200 dark:border-blue-800 px-4 py-2 text-blue-900 dark:text-blue-200">Título</th>
        <th className="border-b border-blue-200 dark:border-blue-800 px-4 py-2 text-blue-900 dark:text-blue-200">Condición</th>
        <th className="border-b border-blue-200 dark:border-blue-800 px-4 py-2 text-blue-900 dark:text-blue-200">Precio</th>
        <th className="border-b border-blue-200 dark:border-blue-800 px-4 py-2 text-blue-900 dark:text-blue-200">Ubicación</th>
      </tr>
    </thead>
    <tbody>
      {products.map(product => (
        <tr key={product.id} className="even:bg-blue-50 dark:even:bg-blue-900/20">
          <td className="border-b border-blue-100 dark:border-blue-900 px-4 py-2"><img src={product.image} alt={product.name} className="h-16 object-contain rounded-lg border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30" /></td>
          <td className="border-b border-blue-100 dark:border-blue-900 px-4 py-2 text-blue-900 dark:text-blue-200">{product.name}</td>
          <td className="border-b border-blue-100 dark:border-blue-900 px-4 py-2 text-blue-600/80 dark:text-blue-300">{product.condition}</td>
          <td className="border-b border-blue-100 dark:border-blue-900 px-4 py-2 text-blue-700 font-bold dark:text-blue-300">${product.price} {product.currency}</td>
          <td className="border-b border-blue-100 dark:border-blue-900 px-4 py-2 text-blue-500/80 dark:text-blue-400">{product.location}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
