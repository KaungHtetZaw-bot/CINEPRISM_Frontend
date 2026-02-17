import { create } from 'zustand';
import api from '../api/axios';
import type{ Movie } from '../types/movie';
import { persist,createJSONStorage } from 'zustand/middleware';

interface MediaState {
  trending: Movie[];
  popularMovies: Movie[];
  popularTV: Movie[];
  selectedMedia: Movie | null;
  history: Movie[];
  searchResults:Movie[];
  isLoading: boolean;
  
  
  fetchTrending: () => Promise<void>;
  fetchPopularMovies: () => Promise<void>;
  fetchPopularTV: () => Promise<void>;
  fetchDetails: (id: string, type: string) => Promise<void>;
  fetchRecent: () => Promise<void>;
  addToRecent: (movie: Movie) => Promise<void>;
  removeFromRecent: (id: number, type: string) => Promise<void>;
  searchMedia: (query: string) => Promise<void>;
  clearSearch: () => void;
  fetchWithCache:(key:keyof MediaState,endpoint:string)=>void;
}

export const useMediaStore = create<MediaState>((set, get) => ({
  trending: [],
  popularMovies: [],
  popularTV: [],
  selectedMedia: null,
  history: [],
  searchResults:[],
  isLoading: false,

  fetchWithCache: async (key: keyof MediaState,endpoint:string) => {
    const currentData = get()[key];
    if(!currentData || (Array.isArray(currentData) && currentData.length === 0)){
      set({isLoading:true});
    }
    try {
      const { data } = await api.get(endpoint);
      set({[key]:data,isLoading:false})
    } catch (error) {
      set({ isLoading: false });
          console.error(`Error fetching ${key}:`, error);
    }
  },

  fetchTrending: async () => get().fetchWithCache('trending','/media/trending'),

  fetchPopularMovies: async () => get().fetchWithCache("popularMovies",'/media/popular/movie'),

  fetchPopularTV: async () => get().fetchWithCache('popularTV','/media/popular/tv'),

  fetchDetails: async (id, type) => {
    set({ isLoading: true, selectedMedia: null });
    const { data } = await api.get(`/media/${type}/${id}`);
    set({ selectedMedia: data, isLoading: false });
  },

  fetchRecent: async () => get().fetchWithCache('history','recentlist'),

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

  searchMedia: async (query: string) => {
    if (!query) return;
    set({ isLoading: true });
    try {
      const { data } = await api.get('/media/search', {
        params: { query: query }
      });
      console.log("search",data)
      set({ searchResults: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
  clearSearch: () => set({ searchResults: [] }),
}));