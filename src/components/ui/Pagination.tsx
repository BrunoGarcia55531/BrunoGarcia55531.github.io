import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => (
  <div className="flex gap-2 justify-center my-4 text-indigo-100">
    <button disabled={page === 0} onClick={() => onPageChange(page - 1)} className="px-2 py-1 border rounded disabled:opacity-50">Anterior</button>
    <span>Página {page + 1} de {totalPages}</span>
    <button disabled={page + 1 >= totalPages} onClick={() => onPageChange(page + 1)} className="px-2 py-1 border rounded disabled:opacity-50">Siguiente</button>
  </div>
);
