import React from 'react';
import { ComparisonDTO } from '../../interfaces/comparison/comparison.dto';

interface ComparisonListProps {
  comparisons: ComparisonDTO[];
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ComparisonList: React.FC<ComparisonListProps> = ({ comparisons, onSelect, onDelete }) => (
  <div>
    {comparisons.length === 0 ? (
      <div className="text-center text-blue-400 py-8">No hay comparaciones guardadas.</div>
    ) : (
      <ul>
        {comparisons.map(comp => (
          <li key={comp.id} className="flex justify-between items-center border-b border-blue-100 dark:border-blue-900 py-2">
            <span className="text-blue-900 dark:text-blue-200">Comparación #{comp.id} ({comp.productIds.length} productos)</span>
            <div className="flex gap-2">
              <button onClick={() => onSelect(comp.id)} className="text-blue-600 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Ver</button>
              <button onClick={() => onDelete(comp.id)} className="text-red-600 underline hover:text-red-800 transition-colors">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);
