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
    <section className="py-8 pr-2">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="relative group mb-4">
            <div className="relative z-20">
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