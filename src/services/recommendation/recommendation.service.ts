import api from '../../utils/api';
import type { RecommendationDTO } from '../../interfaces/recommendation/recommendation.dto';
import { AxiosResponse } from 'axios';

export const getUserRecommendations = async (): Promise<AxiosResponse<RecommendationDTO[]>> => {
  return api.get<RecommendationDTO[]>('/recommendations', { withCredentials: true });
};

export const createRecommendation = async (dto: RecommendationDTO): Promise<RecommendationDTO> => {
  const res = await api.post(`/recommendations`, dto);
  return res.data;
};

export const deleteRecommendation = async (id: number): Promise<void> => {
  await api.delete(`/recommendations/${id}`);
};

export const getAllRecommendations = async (): Promise<RecommendationDTO[]> => {
  const res = await api.get(`/recommendations`);
  return res.data;
};

export const getRecommendationById = async (id: number): Promise<RecommendationDTO> => {
  const res = await api.get(`/recommendations/${id}`);
  return res.data;
};
