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

  const cardWidthClasses = "lg:w-[180px] md:w-[170px] sm:w-[140px] w-[120px] shrink-0 snap-start relative px-2.5";

  return (
    <section className="py-8 flex justify-center items-center">
      <div className="relative w-full group/row"> 
        {!isLoading && (
          <>
            <button 
              onClick={() => handleScroll('left')}
              className={`nav-btn md:left-2 -left-2 z-30 transition-all duration-300 ${
                showLeftArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ChevronLeft size={30} strokeWidth={1} />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className={`nav-btn md:right-2 -right-2 z-30 transition-all duration-300 ${
                showRightArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ChevronRight size={30} strokeWidth={1} />
            </button>
          </>
        )}
        <div 
          ref={rowRef}
          className="flex flex-row overflow-x-auto overflow-y-hidden gap-6 pb-4 no-scrollbar snap-x scroll-smooth"
        >
          {isLoading ? (
          Array.from({ length: limit || 6 }).map((_, i) => (
            <div key={`skeleton-${i}`} className={cardWidthClasses}>
              <MovieSkeleton />
            </div>
          ))
        ) : (
          <>
            {movies.map((movie, index) => (
              <div key={`${movie.id}-${index}`} className={cardWidthClasses}>
                <MovieCard movie={movie} />
              </div>
            ))}
            
            {/* The "More" Card - matches dimensions of actual cards */}
            <div className={`${cardWidthClasses} flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer transition-colors`}>
              <span className="text-dim font-medium">View All</span>
            </div>
          </>
        )}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;