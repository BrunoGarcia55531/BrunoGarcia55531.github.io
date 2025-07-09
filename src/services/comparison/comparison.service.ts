import api from '../../utils/api';
import type { ComparisonDTO } from '../../interfaces/comparison/comparison.dto';

export const getAllComparisons = async (): Promise<ComparisonDTO[]> => {
  const res = await api.get(`/comparisons`);
  return res.data;
};

export const getComparisonById = async (id: number): Promise<ComparisonDTO> => {
  const res = await api.get(`/comparisons/${id}`);
  return res.data;
};

export const createComparison = async (dto: ComparisonDTO): Promise<ComparisonDTO> => {
  const res = await api.post(`/comparisons`, dto);
  return res.data;
};

export const deleteComparison = async (id: number): Promise<void> => {
  await api.delete(`/comparisons/${id}`);
};
