import React from 'react';
import { SearchHistoryDTO } from '../../interfaces/searchHistory/searchHistory.dto';
import { SearchHistoryItem } from './SearchHistoryItem';

interface HistoryListProps {
  history: SearchHistoryDTO[];
  onRepeat: (terms: string) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onRepeat }) => (
  <div>
    {history.length === 0 ? (
      <div className="text-center text-gray-500 py-8">No hay búsquedas previas.</div>
    ) : (
      history.map(item => (
        <SearchHistoryItem key={item.id} terms={item.terms} date={item.date} onRepeat={() => onRepeat(item.terms)} />
      ))
    )}
  </div>
);
