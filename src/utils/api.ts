import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api' || 'http://localhost:8080/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Helper to show toast from outside React
let toastRef: any = null;
export const setToastRef = (ref: any) => {
  toastRef = ref;
};

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      toastRef?.error?.(error.response.data?.message || 'Error inesperado');
    } else {
      toastRef?.error?.('Error de red o servidor no disponible');
    }
    return Promise.reject(error);
  }
);

export default api;
