import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="flex-1 border-2 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 dark:bg-blue-900/30 placeholder-blue-300 text-blue-900 dark:text-blue-100 border-blue-300 focus:border-blue-500 transition-colors"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors shadow border border-blue-400/40">Buscar</button>
    </form>
  );
};
