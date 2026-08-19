import axios from 'axios';
import { clearAuthToken, getAuthToken } from '../utils/authToken';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const isAuthRoute = error.config?.url?.includes('/auth/');
        if (!isAuthRoute) {
          clearAuthToken();
          window.location.href = '/login';
        }
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Network error
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    } else {
      // Other errors
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;
