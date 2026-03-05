import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useInfiniteQuery } from '@tanstack/react-query';
import api from "../api/axios";
import type { Movie } from "../types/movie";

type FlagType = 'recent' | 'watchlist' | 'favorite';

export const useTrending = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const { data } = await api.get('/media/trending');
      return data.results;
    },
    staleTime: 1000 * 60 * 30,
  });
};

export const usePopular = (type: 'movie' | 'tv', page: number) => {
  return useQuery({
    queryKey: ['popular', type, page],
    queryFn: async () => {
      const { data } = await api.get(`/media/popular/${type}`, {
        params: { page }
      });
      return data.results;
    },
    staleTime: 1000 * 60 * 30,
  });
};

export const usePopularInfinite = (type: 'movie' | 'tv') => {
  return useInfiniteQuery({
    queryKey: ['popular', type],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(`/media/popular/${type}`, {
        params: { page: pageParam }
      });
      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.total_pages
        ? pages.length + 1
        : undefined;
    },
  });
};

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query) return [];
      const { data } = await api.get('/media/search', {
        params: { query }
      });
      return data.results;
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 30,
  });
};

export const useMediaDetails = (type: 'movie' | 'tv', id: string) => {
  return useQuery({
    queryKey: ['details', type!, id!],
    queryFn: async () => {
      const { data } = await api.get(`/media/detail/${type}/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
};

export const useGetLists = (flag_type: FlagType) => {
  return useQuery({
    queryKey: [flag_type],
    queryFn: async () => {
      const { data } = await api.get(`/user/lists/${flag_type}`);
      return data.results;
    },
    staleTime: 1000 * 60 * 30,
  });
};

export const useAddToLists = (flag_type: FlagType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movie :Movie) => {
      return api.post(`user/lists/${flag_type}`, {
        tmdb_id: movie.id,
        media_type: movie.type || movie.media_type || 'movie',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [flag_type] });
    },
  });
};

export const useRemoveFromLists = (flag_type: FlagType) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (movie :Movie) => {
      return api.delete(`user/lists/${flag_type}/${movie.type}/${movie.id}`, {
        data: {
          tmdb_id: movie.id,
          media_type: movie.type || movie.media_type || 'movie',
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [flag_type] });
    },
  });
};