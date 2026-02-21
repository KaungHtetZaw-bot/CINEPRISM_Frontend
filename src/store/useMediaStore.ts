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
  page:number;
  hasMore:boolean;
  isInitialLoading: boolean;
  isFetchingMore: boolean;
  
  fetchPopularInfinite: (type: 'movie' | 'tv', reset?: boolean) => Promise<void>;
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

export const useMediaStore = create<MediaState>()(
  persist(
    (set, get) => ({
      trending: [],
      popularMovies: [],
      popularTV: [],
      selectedMedia: null,
      history: [],
      searchResults: [],
      isLoading: false,
      page: 1,
      hasMore: true,
      isInitialLoading: false,
      isFetchingMore: false,
      

      fetchWithCache: async (key: keyof MediaState, endpoint: string) => {
        const currentData = get()[key];
        if (!currentData || (Array.isArray(currentData) && currentData.length === 0)) {
          set({ isLoading: true });
        }
        try {
          const { data } = await api.get(endpoint);
          set({ [key]: data?.results || data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          console.error(`Error fetching ${key}:`, error);
        }
      },

      fetchPopularInfinite: async (type, reset = false) => {
        const targetPage = reset ? 1 : get().page;
        const targetList = type === 'movie' ? 'popularMovies' : 'popularTV';
        if (!reset && (!get().hasMore || get().isFetchingMore)) return
        if (reset) {
          set({
            page: 1,
            hasMore: true,
            isInitialLoading: true,
            [targetList]: [],
          })
        } else {
          set({ isFetchingMore: true })
        }

        try {
          const { data } = await api.get(`/media/popular/${type}`, {
            params: {page: targetPage }
          });

          set((state) => ({
            [targetList]: reset ? data.results : [...(state[targetList] as Movie[]), ...data.results],
            page: targetPage + 1,
            hasMore: targetPage < data.total_pages,
            isInitialLoading: false,
            isFetchingMore: false,
          }));
        } catch (error) {
          console.error(error)
          set({
            isInitialLoading: false,
            isFetchingMore: false,
          })
        }
      },

      fetchTrending: async () => get().fetchWithCache('trending', '/media/trending'),
      fetchPopularMovies: async () => get().fetchWithCache("popularMovies", '/media/popular/movie'),
      fetchPopularTV: async () => get().fetchWithCache('popularTV', '/media/popular/tv'),
      fetchDetails: async (id, type) => {
        set({ isLoading: true, selectedMedia: null });
        const { data } = await api.get(`/media/detail/${type}/${id}`);
        set({ selectedMedia: data, isLoading: false });
      },
      fetchRecent: async () => get().fetchWithCache('history', 'recentlist'),

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
      set({ searchResults: data?.results, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
  clearSearch: () => set({ searchResults: [] }),

    }),
    {
      name: 'media-cache',
      storage: createJSONStorage(() => localStorage),
      // Only cache the lists, history, and selectedMedia
      partialize: (state) => {
        const { searchResults, isLoading, page, hasMore, ...rest } = state;
        return rest;
      },
    }
  )
);