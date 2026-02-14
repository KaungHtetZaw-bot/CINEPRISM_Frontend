// src/types/movie.ts

export interface Movie {  // Ensure 'export' is right here
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  type: 'movie' | 'tv';
}