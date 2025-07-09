import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export function useApi<T = any>(url: string, config?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(url, config);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetch };
}
