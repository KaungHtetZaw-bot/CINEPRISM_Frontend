import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '../../features/auth/store/useAuthStore';

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export function getApiBaseUrl(): string {
  return (
    import.meta.env.VITE_API_BASE_URL ||
    `http://${window.location.hostname}:8000/api`
  );
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
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

// Single-flight refresh: concurrent 401s wait for one shared refresh call
let refreshPromise: Promise<string> | null = null;

function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${api.defaults.baseURL}/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
        }
      )
      .then((response) => {
        const newToken: string | undefined = response.data?.access_token;
        if (!newToken) throw new Error('No access token');

        useAuthStore.getState().setToken(newToken);
        localStorage.setItem('token', newToken);
        return newToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;
    const status = error.response?.status;

    const isAuthRoute =
      originalRequest?.url?.includes('/login') ||
      originalRequest?.url?.includes('/register') ||
      originalRequest?.url?.includes('/refresh') ||
      originalRequest?.url?.includes('/verify-code');

    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();

        // Safe because headers is AxiosHeaders internally
        originalRequest.headers.set('Authorization', `Bearer ${newToken}`);

        return api(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
