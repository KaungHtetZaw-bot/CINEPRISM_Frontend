import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import MovieSkeleton from './MovieSkeleton';
import type { Movie } from '../../types/movie';

interface MovieRowProps {
  movies: Movie[];
  isLoading: boolean;
  limit?: number;
}

const MovieRow: React.FC<MovieRowProps> = ({ movies, isLoading, limit }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      rowRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 flex justify-center items-center">
      <div className="relative w-[90%] md:w-3/4 group/row"> 
        {!isLoading && (
          <>
            <button 
              onClick={() => handleScroll('left')}
              className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 z-30 p-2 text-white/30 hover:text-cinema-gold transition-all"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            
            <button 
              onClick={() => handleScroll('right')}
              className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 z-30 p-2 text-white/30 hover:text-cinema-gold transition-all"
              aria-label="Scroll Right"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
          </>
        )}

        {/* The Scroll Area */}
        <div 
          ref={rowRef}
          className="flex flex-row overflow-x-auto gap-6 pb-4 no-scrollbar snap-x scroll-smooth"
        >
          {isLoading ? (
            Array.from({ length: limit || 6 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="min-w-45 shrink-0">
                <MovieSkeleton />
              </div>
            ))
          ) : (
            movies.map((movie, index) => (
              <div 
                key={`${movie.id}-${index}`} 
                className="shrink-0 snap-start"
              >
                <div className="lg:w-45 md:w-44 sm:w-33 w-30">
                  <MovieCard movie={movie} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;