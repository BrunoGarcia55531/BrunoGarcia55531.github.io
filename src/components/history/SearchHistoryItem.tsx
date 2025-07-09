import React from 'react';

interface SearchHistoryItemProps {
  terms: string;
  date: string;
  onRepeat: () => void;
}

export const SearchHistoryItem: React.FC<SearchHistoryItemProps> = ({ terms, date, onRepeat }) => (
  <div className="flex justify-between items-center border-b py-2">
    <div>
      <span className="font-medium text-indigo-200">{terms}</span>
      <span className="text-xs text-gray-400 ml-2">{new Date(date).toLocaleString()}</span>
    </div>
    <button onClick={onRepeat} className="text-blue-600 underline">Repetir</button>
  </div>
);
