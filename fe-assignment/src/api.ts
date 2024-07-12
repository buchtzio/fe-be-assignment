import axios from 'axios';
import { getToken } from './utils/auth';
import { useAuth } from './context/AuthContext';

const api = axios.create({
  /*use this for tests instead
  baseURL: 'https://mock-api-base-url.com', */
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const { logout } = useAuth();
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
