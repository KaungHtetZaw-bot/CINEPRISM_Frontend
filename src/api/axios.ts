import axios, { AxiosError } from 'axios';
import type{ InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '../store/useAuthStore';

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    `http://${window.location.hostname}:8000/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* =========================
   Request Interceptor
========================= */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token) {
      // Axios v1 always uses AxiosHeaders internally
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   Response Interceptor
========================= */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;
    const status = error.response?.status;

    const isAuthRoute =
      originalRequest?.url?.includes('/login') ||
      originalRequest?.url?.includes('/register') ||
      originalRequest?.url?.includes('/refresh');

    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${api.defaults.baseURL}/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
          }
        );

        const newToken = refreshResponse.data.access_token;
        if (!newToken) throw new Error('No access token');

        useAuthStore.getState().setToken(newToken);
        localStorage.setItem('token', newToken);

        // Safe because headers is AxiosHeaders internally
        originalRequest.headers.set(
          'Authorization',
          `Bearer ${newToken}`
        );

        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;