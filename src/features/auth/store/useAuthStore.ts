import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../../../app/api/axios';
import type { User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

function extractErrorMessage(error: unknown, fallback: string): string {
  const response = (error as { response?: { data?: Record<string, unknown> } })?.response?.data;

  if (!response) return fallback;

  if (typeof response.error === 'string') return response.error;
  if (typeof response.message === 'string') return response.message;
  if (typeof response.errors === 'string') return response.errors;
  if (Array.isArray(response.errors) && typeof response.errors[0] === 'string') {
    return response.errors[0];
  }

  return fallback;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  verifyOTP: (data: RegisterData, code: string) => Promise<void>;
  setToken: (token: string | null) => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setToken: (token) => set({ token }),

      setUser: (user) => set({ user }),

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/login', credentials);
          set({ user: data.user, token: data.access_token, isLoading: false });
          return true;
        } catch (error: unknown) {
          set({
            isLoading: false,
            error: extractErrorMessage(error, 'Login failed'),
          });
          return false;
        }
      },

      verifyOTP: async (formData, code) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/verify-code', { ...formData, code });
          set({ user: data.user, token: data.access_token, isLoading: false });
        } catch (error: unknown) {
          set({
            isLoading: false,
            error: extractErrorMessage(error, 'OTP verification failed'),
          });
          throw error;
        }
      },

      register: async (formData) => {
        set({ isLoading: true, error: null });
        try {
          await api.post('/register', formData);
          set({ isLoading: false });
        } catch (error: unknown) {
          set({
            isLoading: false,
            error: extractErrorMessage(error, 'Registration failed'),
          });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
