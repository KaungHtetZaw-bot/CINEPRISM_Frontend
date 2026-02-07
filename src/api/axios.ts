import axios from 'axios';

const api = axios.create({
  // If you're using TMDB for now: https://api.themoviedb.org/3
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://192.168.110.127:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;