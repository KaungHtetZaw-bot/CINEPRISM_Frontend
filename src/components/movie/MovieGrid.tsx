import React from 'react';
import MovieCard from './MovieCard';
import MovieSkeleton from '../skeleton/MovieSkeleton';
import type { Movie } from '../../types/movie';
import {useMediaNavigation} from "../../utils/useMediaNavigation"

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  limit?: number;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, isLoading, limit }) => {
  const { goToDetails } = useMediaNavigation();
  return (
    <>
      <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="relative group mb-4">
            <div className="relative z-20" onClick={()=>goToDetails(movie)}>
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
      </section>
    </>
  );
};

export default MovieGrid;