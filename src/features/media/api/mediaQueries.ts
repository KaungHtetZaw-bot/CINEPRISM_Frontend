import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from '@tanstack/react-query';
import api from "../../../app/api/axios";
import type { Movie } from "../types/media.type";

export const useTrendingMedia = () => {
    return useQuery({
        queryKey: ['trending'],
        queryFn: async () => {
            const { data } = await api.get('/media/trending');
            return data.results;
        },
        staleTime: 1000 * 60 * 30,
    });
};


export const useInfinitePopularMoviesOrTv = (mediaType: 'movie' | 'tv', enabled = true) => {
    return useInfiniteQuery({
        queryKey: ['popular', mediaType],
        initialPageParam: 1,
        enabled,
        queryFn: async ({ pageParam }) => {
            const { data } = await api.get(`/media/popular/${mediaType}?page=${pageParam}`)
            return data;
        },
        getNextPageParam: (lastPage, pages) => {
            return pages.length < lastPage.total_pages
                ? pages.length + 1
                : undefined;
        },
        staleTime: 1000 * 60 * 30,
    });
};

export const useGenres = (media_type: 'movie' | 'tv') => {
    return useQuery({
        queryKey: ['genres', media_type],
        queryFn: async () => {
            const { data } = await api.get(`/media/genres/${media_type}`);
            return data?.results || [];
        },
        staleTime: 1000 * 60 * 60,
    });
};

export const useMediaByGenres = (mediaType: 'movie' | 'tv' , genreId: string, enabled = true) => {
    return useInfiniteQuery({
        // Must be unique from popular movies, otherwise genre results
        // overwrite the 'popular' cache
        queryKey: ['media-by-genre', mediaType, genreId],
        initialPageParam: 1,
        enabled: enabled && !!genreId,
        queryFn: async ({ pageParam }) => {
            const { data } = await api.get(`/media/genre/${mediaType}/${genreId}?page=${pageParam}`)
            return data;
        },
        getNextPageParam: (lastPage, pages) => {
            return pages.length < lastPage.total_pages
                ? pages.length + 1
                : undefined;
        },
        staleTime: 1000 * 60 * 30,
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
    return useQuery<Movie>({
        queryKey: ['details', type!, id!],
        queryFn: async () => {
            const { data } = await api.get(`/media/detail/${type}/${id}`);
            return data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 60,
    });
};