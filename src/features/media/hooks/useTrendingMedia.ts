import { getTrendingMedia } from "../api/getTrendingMedia";
import { useQuery } from "@tanstack/react-query";

export const useTrendingMedia = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: getTrendingMedia,
    staleTime: 1000 * 60 * 30,
  });
};