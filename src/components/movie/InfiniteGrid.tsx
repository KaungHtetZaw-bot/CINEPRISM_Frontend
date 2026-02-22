import { useEffect, useRef } from 'react';
import { useMediaStore } from '../../store/useMediaStore';
import MovieCard from './MovieCard';
import MovieSkeleton from '../skeleton/MovieSkeleton';
import { useMediaNavigation } from '../../utils/useMediaNavigation'

const InfiniteGrid = ({ type }: { type: 'movie' | 'tv' }) => {
  const { popularMovies, popularTV, fetchPopularInfinite, hasMore, isInitialLoading, isFetchingMore } = useMediaStore();
  const observerTarget = useRef(null);
  const { goToDetails } = useMediaNavigation();
  
  const medias = type === 'movie' ? popularMovies : popularTV;

  useEffect(() => {
    fetchPopularInfinite(type, true);
  }, [type, fetchPopularInfinite]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore && !isInitialLoading) {
          fetchPopularInfinite(type);
        }
      },
      { rootMargin: '600px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isFetchingMore, isInitialLoading, type, fetchPopularInfinite]);

  return (
    <div className="md:py-6 py-0 px-4 lg:px-8">
      <div className="mb-10 flex items-baseline gap-4">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          {type === 'movie' ? 'Cinema' : 'Series'}
        </h2>
        <div className="h-0.5 flex-1 bg-white/5" />
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          {medias.length} units cataloged
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"> 
        
        {medias.length === 0 && isInitialLoading &&
          Array.from({ length: 20 }).map((_, i) => (
            <div key={`initial-${i}`} className="opacity-50">
               <MovieSkeleton />
            </div>
          ))
        }

        {medias.map((media, index) => (
          <div 
            key={`${media.id}-${index}`} 
            onClick={() => goToDetails(media)}
            // Every 4th item gets a slight offset to create a "Masonry" feel without the complexity
            // className={`cursor-pointer group relative transition-all duration-500 
            //   ${index % 4 === 1 ? "md:mt-10" : ""} 
            //   ${index % 4 === 3 ? "md:-mt-6" : ""}`}
          >
            {/* <span className="absolute -top-4 -left-2 text-[40px] font-black text-white/5 italic group-hover:text-cinema-gold/20 transition-colors pointer-events-none">
               {(index + 1).toString().padStart(2, '0')}
            </span> */}

            <MovieCard movie={media} />
            
            <div className="mt-4 px-1 space-y-1">
               <p className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter truncate">
                 {media.title || media.name}
               </p>
               <div className="h-px w-0 group-hover:w-full bg-cinema-gold transition-all duration-500" />
            </div>
          </div>
        ))}
        {isFetchingMore && 
          Array.from({ length: 20 }).map((_, i) => (
            <div key={`more-${i}`} className="opacity-50">
               <MovieSkeleton />
            </div>
          ))
        }
      </div>

      <div ref={observerTarget} className="h-40 w-full" />
      
      {!hasMore && medias.length > 0 && (
        <div className="flex flex-col items-center py-20 space-y-4">
          <div className="h-px w-20 bg-white/10" />
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.5em] text-center">
            End of Transmission
          </p>
        </div>
      )}
    </div>
  );
};

export default InfiniteGrid;