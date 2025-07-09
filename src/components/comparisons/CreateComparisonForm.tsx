import React, { useState } from 'react';
import { Product } from '../../interfaces/product/product.dto';

interface CreateComparisonFormProps {
  products: Product[];
  onCreate: (selected: string[]) => void;
}

export const CreateComparisonForm: React.FC<CreateComparisonFormProps> = ({ products, onCreate }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onCreate(selected); }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {products.map(product => (
          <label key={product.id} className="flex items-center gap-2 border border-blue-200 dark:border-blue-800 p-3 rounded-xl cursor-pointer bg-blue-50 dark:bg-blue-900/30 shadow-sm transition-colors">
            <input type="checkbox" checked={selected.includes(product.id)} onChange={() => toggle(product.id)} className="accent-blue-600 w-5 h-5" />
            <img src={product.image} alt={product.name} className="h-10 object-contain rounded border border-blue-100 dark:border-blue-900 bg-white dark:bg-blue-950/80" />
            <span className="text-blue-900 dark:text-blue-200">{product.name}</span>
          </label>
        ))}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors shadow border border-blue-400/40" disabled={selected.length < 2}>Comparar seleccionados</button>
    </form>
  );
};
