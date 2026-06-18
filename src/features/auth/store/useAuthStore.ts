import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../../../app/api/axios';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: any) => Promise<boolean>;
  logout: () => void;
  register: (data: any) => Promise<void>;
  verifyOTP: (data: any, code: string) => Promise<void>;
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
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Login failed'
          });
          return false;
        }
      },

      verifyOTP: async (formData, code) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/verify-code', { ...formData, code });
          set({ user: data.user, token: data.access_token, isLoading: false });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'OTP verification failed'
          });
          throw error;
        }
      },

      register: async (formData) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/register', formData);
          set({ isLoading: false });
          return data.message;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.errors || 'Registration failed'
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