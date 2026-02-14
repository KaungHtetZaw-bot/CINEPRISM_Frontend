import { useState, useEffect } from 'react';
import api from '../api/axios';
import type { Movie } from '../types/movie';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/media/trending');
        const data = response.data.results || response.data;
        setMovies(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Something went wrong while fetching movies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, isLoading, error };
};