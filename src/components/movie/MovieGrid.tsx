import React,{ useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MovieCard from './MovieCard';
import MovieSkeleton from './MovieSkeleton';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  limit?: number;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, isLoading, limit }) => {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isLoading && movies.length > 0) {
    }
  }, [inView, isLoading, movies.length]);

  return (
    <section className="py-8 px-6 md:px-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="relative group pl-8 mb-4">
            <span 
              className="absolute -left-4 bottom-[-10%] z-10 
                        text-[8rem] font-black leading-none
                        select-none pointer-events-none
                        transition-all duration-500
                        group-hover:bottom-[0%]
                        text-transparent bg-clip-text bg-linear-to-t from-default-400 to-transparent
                        [text-shadow:2px_2px_10px_rgba(0,0,0,0.8)]
                        [-webkit-text-stroke:2px_rgba(255,255,255,0.5)]"
            >
              {index + 1}
            </span>
            <div className="relative z-20 transition-transform duration-500 group-hover:-translate-y-2">
              <MovieCard movie={movie} />
            </div>
          </div>
        ))}

        {isLoading && (
          <>
            {Array.from({ length: limit || 20 }).map((_, i) => (
              <MovieSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}
        
        <div ref={ref} className="col-span-full h-10" aria-hidden="true" />
      </div>

      {!isLoading && movies.length > 0 && (
        <div className="text-center py-10 text-muted font-medium">
          No more movies to show 🎬
        </div>
      )}
    </section>
  );
};

export default MovieGrid;