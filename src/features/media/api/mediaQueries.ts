import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from '@tanstack/react-query';
import api from "../../../app/api/axios";

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


export const useInfinitePopularMoviesOrTv = (mediaType: 'movie' | 'tv') => {
    return useInfiniteQuery({
        queryKey: ['popular', mediaType],
        initialPageParam: 1,
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
            const data = await api.get(`/media/genres/${media_type}`);
            console.log('Fetched genres:', data);
            return data?.data?.results || data?.data || [];
        },
        staleTime: 1000 * 60 * 60,
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