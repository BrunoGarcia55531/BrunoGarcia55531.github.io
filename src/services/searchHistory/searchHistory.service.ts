import api from '../../utils/api';
import type { SearchHistoryDTO } from '../../interfaces/searchHistory/searchHistory.dto';

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export const getUserSearchHistory = async (userId: number, page = 0, size = 10): Promise<Page<SearchHistoryDTO>> => {
  const res = await api.get(`/search-history/user/${userId}`, { params: { page, size } });
  return res.data;
};

export const saveSearchHistory = async (terms: string): Promise<SearchHistoryDTO> => {
  const res = await api.post(`/search-history`, null, { params: { terms } });
  return res.data;
};

export const getSearchHistoryById = async (id: number): Promise<SearchHistoryDTO> => {
  const res = await api.get(`/search-history/${id}`);
  return res.data;
};
