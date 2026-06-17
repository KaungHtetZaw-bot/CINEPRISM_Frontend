import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Movie } from "../../media/types/media.type";
import api from "../../../app/api/axios";

type FlagType = 'recent' | 'watchlist' | 'favorite';

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
        mutationFn: async (movie: Movie) => {
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
        mutationFn: async (movie: Movie) => {
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