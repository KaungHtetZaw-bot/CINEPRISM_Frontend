import Navbar from '../components/layout/Navbar';
import Hero from '../components/movie/Hero';
import { useMovies } from '../hooks/useMovies';
import tvDisplay from '../assets/images/tv_display.png';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '../components/movie/MovieCard';
import MovieSkeleton from '../components/skeleton/MovieSkeleton';
import type { Movie } from '../types/movie';

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

const FeatureSection = () => {
    return (
      <section className="md:py-16 py-8 px-4 md:px-24 bg-app transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-main">
              Enjoy on your <span className="text-accent">TV.</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted font-medium">
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
            </p>
          </div>
          <div className="flex-1 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 blur-[100px] -z-10" />
            
            <div className="relative z-10 rounded-2xl border border-border bg-surface-1 p-4 shadow-2xl">
              <img 
                src={tvDisplay} 
                alt="TV Display" 
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    );
  };

const Footer = () => {
  const links = [
    ['FAQ', 'Investor Relations', 'Ways to Watch', 'Corporate Information', 'Only on Netflix'],
    ['Help Center', 'Jobs', 'Terms of Use', 'Contact Us'],
    ['Account', 'Redeem Gift Cards', 'Privacy', 'Speed Test'],
    ['Media Center', 'Buy Gift Cards', 'Cookie Preferences', 'Legal Notices']
  ];

  return (
    <footer className="bg-app pt-20 pb-12 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-250 mx-auto">
        <p className="text-muted mb-8 hover:underline cursor-pointer">
          Questions? Contact us.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {links.map((column, colIndex) => (
            <ul key={colIndex} className="flex flex-col gap-3">
              {column.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted text-sm hover:underline hover:text-main">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="mb-8">
          <div className="relative inline-block">
            <select className="bg-surface-1 border border-border text-main text-sm py-2 pl-4 pr-10 rounded-md appearance-none focus:ring-1 focus:ring-accent outline-none">
              <option>English</option>
              <option>Myanmar (Burma)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <p className="text-muted text-xs">
          © 2026 YourCinema. All rights reserved. Built with precision for the best viewing experience.
        </p>
      </div>
    </footer>
  );
};


const LandingPage = () => {
  const { movies, isLoading } = useMovies();
  const heroMovie = movies[0]; 
  return (
    <div className="min-h-screen bg-app text-main selection:bg-accent selection:text-black transition-colors duration-500">
      <Navbar />
      <section className="relative h-[110vh] w-full">
        <Hero movie={heroMovie} />
      </section>
      <main className="relative px-4 md:px-12 z-20 -mt-[15vh] bg-app rounded-t-[60px] md:rounded-t-[120px] shadow-[0_-50px_100px_rgba(0,0,0,0.9)] transition-colors duration-500">
        <div className="pt-24 md:pb-24 pb-10 max-w-350 mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full z-30 pointer-events-none">
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-32">
              <path
                d="M0 100 C 200 0, 800 0, 1000 100" 
                fill="none"
                stroke="url(#glowGradient)"
                strokeWidth="4"
                className="drop-shadow-[0_0_20px_rgba(var(--color-accent),0.8)]"
              />
              <defs>
                <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="rgb(var(--color-accent))" stopOpacity="1" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-175 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-accent/20 via-accent/5 to-transparent pointer-events-none z-0" />
          <div className="relative z-40 flex flex-col mb-12 md:px-15 px-4 md:text-left text-center items-center md:items-start gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-main">
              Trending <span className="bg-linear-to-r from-accent to-accent-soft bg-clip-text text-transparent pr-1">Now</span>
            </h3>
          </div>
          <div className="relative z-40 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <MovieRow 
              movies={movies.slice(1, 11)} 
              isLoading={isLoading}
              limit={6}
            />
          </div>
        </div>
        <FeatureSection />
        <section className="py-10 md:py-20 text-center px-4 bg-app transition-colors duration-500">
          <h3 className="text-xl md:text-2xl mb-8 font-medium max-w-2xl mx-auto text-main">
            Ready to watch? Enter your email to create or restart your membership.
          </h3>
          <div className="flex flex-col md:flex-row gap-2 max-w-3xl mx-auto h-auto md:h-16">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 bg-surface-2 border border-border px-6 py-4 text-main rounded-md md:rounded-l-sm focus:outline-none focus:ring-2 ring-accent transition-all"
            />
            <button className="bg-accent text-black font-black px-10 py-4 text-xl md:text-2xl flex items-center justify-center gap-2 hover:bg-accent-soft transition-all rounded-md md:rounded-r-sm active:scale-95">
              Get Started <ChevronRight size={28} />
            </button>
          </div>
        </section>    
        <Footer />
      </main>
    </div>
  );
}

export default LandingPage