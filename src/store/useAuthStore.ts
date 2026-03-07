import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../api/axios';

export interface User {
  id: number;
  name: string;
  email: string;
  is_vip: number;
  vip_expires_at: number | null;
  email_verified_at: number | null;
  avatar?: string;
  role?: string;
}

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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setToken: (token) => set({ token }),

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/login', credentials);
          set({ user: data.user, token: data.access_token, isLoading: false });
          return true;
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Login failed' 
          });
          return false;
        }
      },

      verifyOTP: async ( formData, code) => {
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
        const {data} = await api.post('/register', formData);
          set({ isLoading: false });
          console.log('Registration successful:', data.message);
          return data.message;
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Registration failed' 
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