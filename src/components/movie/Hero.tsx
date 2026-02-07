import React from 'react';

const Hero = ({ movie }: { movie: any }) => {
  if (!movie) return <div className="h-[70vh] bg-zinc-900 animate-pulse" />;

  return (
    <div className="relative h-[70vh] w-full overflow-hidden mb-12">
      {/* Background Image with Gradient Overlay */}
      <img 
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
        className="w-full h-full object-cover"
        alt="Hero Background"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-app via-app/40 to-transparent" />
      
      {/* Hero Content */}
      <div className="absolute bottom-12 left-8 md:left-16 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-black mb-4 text-white drop-shadow-lg">
          {movie.title}
        </h1>
        <p className="text-muted text-lg mb-6 line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex gap-4">
          <button className="bg-cinema-gold text-black px-8 py-3 rounded-lg font-bold hover:scale-105 transition">
            Play Now
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition">
            + Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;