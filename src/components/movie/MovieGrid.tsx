import React from 'react';
import MovieCard from './MovieCard';
import MovieSkeleton from '../skeleton/MovieSkeleton';
import type { Movie } from '../../types/movie';
import {useMediaNavigation} from "../../utils/useMediaNavigation"
import { Trash } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useRemoveFromLists } from '../../queries/mediaQueries';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  limit?: number;
}

type FlagType = 'recent' | 'watchlist' | 'favorite';

const MovieGrid: React.FC<MovieGridProps> = ({ movies, isLoading, limit }) => {
  const { goToDetails } = useMediaNavigation();
  const { type: flag_type } = useParams<{ type: FlagType }>();
  const { mutate: removeMovie } = useRemoveFromLists(flag_type || 'recent');
  return (
    <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
      {movies.map((movie, index) => (
        <div key={`${movie.id}-${index}`} className="relative group mb-4">
          <button 
            onClick={()=>removeMovie(movie)} 
            className="absolute top-2 right-2 z-50 p-1.5 
            border border-border text-main rounded-sm
            opacity-0 group-hover:opacity-100 
            hover:border-rose-500 hover:text-rose-500 hover:scale-110
            transition-all duration-300"
          >
            <Trash size={14}/>
          </button>
          
          <div onClick={()=>goToDetails(movie)}>
            <MovieCard movie={movie} />
          </div>
          <div className="md:mt-4 mt-2 px-1 space-y-1">
            <p className="text-sm font-black uppercase text-muted tracking-tighter truncate">
              {movie.title || movie.name}
            </p>
            <div className="h-px w-0 group-hover:w-full bg-accent transition-all duration-500" />
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
  );
};

export default MovieGrid;