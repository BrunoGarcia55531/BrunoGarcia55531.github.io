import { useCallback, useState } from 'react';
import type { ComparisonDTO } from '../interfaces/comparison/comparison.dto';
import * as comparisonService from '../services/comparison/comparison.service';

export function useComparisons() {
  const [comparisons, setComparisons] = useState<ComparisonDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchComparisons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await comparisonService.getAllComparisons();
      setComparisons(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { comparisons, loading, error, fetchComparisons };
}

export function useCreateComparison() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [result, setResult] = useState<ComparisonDTO | null>(null);

  const create = useCallback(async (dto: ComparisonDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await comparisonService.createComparison(dto);
      setResult(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error, result };
}

export function useDeleteComparison() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const remove = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await comparisonService.deleteComparison(id);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
}
