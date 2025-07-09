import { useCallback, useState } from 'react';
import type { SearchHistoryDTO } from '../interfaces/searchHistory/searchHistory.dto';
import * as searchHistoryService from '../services/searchHistory/searchHistory.service';

export function useUserSearchHistory(userId?: number) {
  const [history, setHistory] = useState<SearchHistoryDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchHistory = useCallback(async (page = 0, size = 10) => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await searchHistoryService.getUserSearchHistory(userId, page, size);
      setHistory(res.content);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { history, loading, error, fetchHistory };
}

export function useSaveSearchHistory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [result, setResult] = useState<SearchHistoryDTO | null>(null);

  const save = useCallback(async (terms: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await searchHistoryService.saveSearchHistory(terms);
      setResult(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { save, loading, error, result };
}
