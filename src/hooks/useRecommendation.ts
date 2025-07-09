import { useCallback, useState } from 'react';
import type { RecommendationDTO } from '../interfaces/recommendation/recommendation.dto';
import * as recommendationService from '../services/recommendation/recommendation.service';

export function useUserRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await recommendationService.getUserRecommendations();
      setRecommendations(res.data.slice(0, 5));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { recommendations, loading, error, fetchRecommendations };
}

export function useCreateRecommendation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [result, setResult] = useState<RecommendationDTO | null>(null);

  const create = useCallback(async (dto: RecommendationDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await recommendationService.createRecommendation(dto);
      setResult(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error, result };
}

export function useDeleteRecommendation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const remove = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await recommendationService.deleteRecommendation(id);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
}
