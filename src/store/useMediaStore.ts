import { create } from 'zustand';
import api from '../api/axios';
import type{ Movie } from '../types/movie';

interface MediaState {
  trending: Movie[];
  popularMovies: Movie[];
  popularTV: Movie[];
  selectedMedia: Movie | null;
  history: Movie[];
  isLoading: boolean;
  
  fetchTrending: () => Promise<void>;
  fetchPopularMovies: () => Promise<void>;
  fetchPopularTV: () => Promise<void>;
  fetchDetails: (id: string, type: string) => Promise<void>;
  fetchRecent: () => Promise<void>;
  addToRecent: (movie: Movie) => Promise<void>;
  removeFromRecent: (id: number, type: string) => Promise<void>;
}

export const useMediaStore = create<MediaState>((set, get) => ({
  trending: [],
  popularMovies: [],
  popularTV: [],
  selectedMedia: null,
  history: [],
  isLoading: false,

  fetchTrending: async () => {
    set({ isLoading: true });
    const { data } = await api.get('/media/trending');
    set({ trending: data, isLoading: false });
  },

  fetchPopularMovies: async () => {
    set({ isLoading: true });
    const { data } = await api.get('/media/popular/movie');
    set({ popularMovies: data, isLoading: false });
  },

  fetchPopularTV: async () => {
    set({ isLoading: true });
    const { data } = await api.get('/media/popular/tv');
    set({ popularTV: data, isLoading: false });
  },

  fetchDetails: async (id, type) => {
    set({ isLoading: true, selectedMedia: null });
    const { data } = await api.get(`/media/${type}/${id}`);
    set({ selectedMedia: data, isLoading: false });
  },

  fetchRecent: async () => {
    const { data } = await api.get('/recentlist');
    set({ history: data });
  },

  addToRecent: async (movie) => {
    const currentHistory = get().history;
    const filtered = currentHistory.filter(m => m.id !== movie.id);
    set({ history: [movie, ...filtered] });

    await api.post('/recentlist', {
      tmdb_id: movie.id,
      type: movie.type || movie.media_type || 'movie',
    });
  },

  removeFromRecent: async (id, type) => {
    const currentHistory = get().history;
    const updatedHistory = currentHistory.filter(m => !(m.id === id && (m.type === type || m.media_type === type)));
    set({ history: updatedHistory });
    
    await api.delete('/recentlist', {
      data: {
        tmdb_id: id,
        type: type,
      },
    });
  },
}));