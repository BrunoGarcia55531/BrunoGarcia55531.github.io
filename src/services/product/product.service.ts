import axios from '../../utils/api';
import type { AxiosResponse } from 'axios';
import type { Product } from '../../interfaces/product/product.dto';

export interface EbaySearchResponse {
  ebaySearchResponse: {
    itemSummaries: any[];
    total: number;
    limit: number;
    offset: number;
  };
  rankingResult?: any;
}

export const searchProducts = async (
  query: string,
  offset = 0,
  limit = 10
): Promise<EbaySearchResponse> => {
  const response = await axios.get<EbaySearchResponse>('/products/ebay/search', {
    params: { query, offset, limit },
    withCredentials: true
  });
  return response.data;
};

export const getProductById = async (
  id: string
): Promise<AxiosResponse<Product>> => {
  return axios.get<Product>(`/products/${id}`, {
    withCredentials: true
  });
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};