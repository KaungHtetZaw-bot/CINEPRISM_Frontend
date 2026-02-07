import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/movie/Hero';
import MovieGrid from './components/movie/MovieGrid';
import { useMovies } from './hooks/useMovies';
import './App.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const App = () => {
  const { movies, isLoading } = useMovies();
  const heroMovie = movies[0];

  return (
    <div className="main-container p-0!">
      <Navbar />
      <Hero movie={heroMovie} />
      
      <main className="px-8 pb-24">
         <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
         <MovieGrid movies={movies.slice(1)} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;