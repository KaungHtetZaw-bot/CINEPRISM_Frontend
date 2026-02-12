import React, { useEffect, useRef, useState } from 'react';
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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const updateScrollIndicators = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 10);
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 50;
      setShowRightArrow(!isAtEnd);
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollIndicators);
      updateScrollIndicators();
    }
    return () => el?.removeEventListener('scroll', updateScrollIndicators);
  }, [isLoading, movies]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      rowRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 flex justify-center items-center">
      <div className="relative w-full group/row md:px-30 px-5"> 
        {!isLoading && (
          <>
            <button 
              onClick={() => handleScroll('left')}
              className={`nav-btn md:left-2 -left-2 z-30 transition-all duration-300 ${
                showLeftArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className={`nav-btn md:right-2 -right-2 z-30 transition-all duration-300 ${
                showRightArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
          </>
        )}
        <div 
          ref={rowRef}
          className="flex flex-row overflow-x-auto overflow-y-hidden gap-6 pb-4 no-scrollbar snap-x scroll-smooth"
        >
          {isLoading ? (
            Array.from({ length: limit || 6 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="lg:w-45 md:w-45 sm:w-35 w-30 shrink-0">
                <MovieSkeleton />
              </div>
            ))
          ) : (
            movies.map((movie, index) => (
              <div 
                key={`${movie.id}-${index}`} 
                className="shrink-0 snap-start relative px-2.5"
              >
                
                <div className="lg:w-45 md:w-44 sm:w-33 w-30">
                  <MovieCard movie={movie} />
                </div>
                <span className="absolute -bottom-4 -left-1 z-0 
                     text-[8rem] font-black leading-none
                     text-black [-webkit-text-stroke:4px_var(--text-main)]
                     opacity-40 select-none pointer-events-none">
                  {index + 1}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;