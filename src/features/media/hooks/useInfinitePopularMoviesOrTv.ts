import { getPopularMoivesOrTv } from "../api/getPopularMoviesOrTv";
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfinitePopularMoviesOrTv = (mediaType: 'movie' | 'tv') => {
  return useInfiniteQuery({
    queryKey: ['popular', mediaType],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const data = await getPopularMoivesOrTv(mediaType, pageParam);
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