import { useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import MovieSkeleton from './skeleton/MovieSkeleton';
import { useMediaNavigation } from '../utils/useMediaNavigation'
import { useInfinitePopularMoviesOrTv, useMediaByGenres } from '../api/mediaQueries';

/** "sci-fi-fantasy" -> "Sci Fi Fantasy" */
const prettifySlug = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');


const InfiniteGrid = ({ type, genreId, genreName }: { type: 'movie' | 'tv', genreId:string | null, genreName : string | null }) => {
  
  // Hooks must be called unconditionally; `enabled` picks the active query
  const popularQuery = useInfinitePopularMoviesOrTv(type, !genreId);
  const genreQuery = useMediaByGenres(type, genreId ?? '', !!genreId);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = genreId ? genreQuery : popularQuery;

  const observerTarget = useRef(null);
  const { goToDetails } = useMediaNavigation();
  const medias = data?.pages.flatMap((page) => page.results) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      { threshold: 0.9 }
      // { rootMargin: '600px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasNextPage, isFetchingNextPage, isLoading, type, fetchNextPage]);

  return (
    <div className="md:py-6 py-0 px-4 lg:px-8">
      <div className="md:mb-10 mb-3 flex items-baseline gap-4">
        <h2 className="md:text-4xl text-2xl font-black italic uppercase tracking-tighter text-main">
          {type === 'movie' ? 'Cinema' : 'Series'} {genreName && <span className='text-sm not-italic bg-linear-to-r from-accent to-accent-soft bg-clip-text text-transparent'>{prettifySlug(genreName)}</span>}
        </h2>
        <div className="h-0.5 flex-1 bg-border" />
        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
          {medias.length} units cataloged
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">

        {medias.length === 0 && isLoading &&
          Array.from({ length: 20 }).map((_, i) => (
            <div key={`initial-${i}`} className="opacity-50">
              <MovieSkeleton />
            </div>
          ))
        }

        {medias.length > 0 && medias.map((media, index) => (
          <div
            key={`${media.id}-${index}`}
            onClick={() => goToDetails(media)}
            className="cursor-pointer group relative transition-all duration-500"
          >
            <MovieCard movie={media} />

            <div className="md:mt-4 mt-2 px-1 space-y-1">
              <p className="text-[10px] font-black uppercase text-muted tracking-tighter truncate">
                {media.title || media.name}
              </p>
              <div className="h-px w-0 group-hover:w-full bg-accent transition-all duration-500" />
            </div>
          </div>
        ))}
        {isFetchingNextPage &&
          Array.from({ length: 20 }).map((_, i) => (
            <div key={`more-${i}`} className="opacity-50">
              <MovieSkeleton />
            </div>
          ))
        }
      </div>

      <div ref={observerTarget} className="h-40 w-full" />

      {!hasNextPage && medias.length > 0 && (
        <div className="flex flex-col items-center py-20 space-y-4">
          <div className="h-px w-20 bg-border" />
          <p className="text-muted text-[9px] font-black uppercase tracking-[0.5em] text-center">
            End of Transmission
          </p>
        </div>
      )}
    </div>
  );
};

export default InfiniteGrid;