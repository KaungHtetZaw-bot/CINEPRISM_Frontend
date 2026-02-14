import axios from 'axios';
import { store } from '../store';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://192.168.110.127:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    const backupToken = localStorage.getItem('token');

    const activeToken = token || backupToken;
    
    if (activeToken) {
      config.headers.Authorization = `Bearer ${activeToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: Force logout user if token expires
      // store.dispatch(logout()); 
    }
    return Promise.reject(error);
  }
);

export default api;