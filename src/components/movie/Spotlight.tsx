import type { Movie } from '../../types/movie';

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const Spotlight = ({ movie, isLoading }: { movie?: Movie; isLoading: boolean }) => {
  if (isLoading || !movie) {
    return <div className="h-[70vh] w-full bg-neutral-900 animate-pulse" />;
  }

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <img 
        src={`${TMDB_IMAGE_BASE}${movie.backdrop_path}`} 
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-app via-app/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-app/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 space-y-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
          {movie.title || movie.name}
        </h1>
        <p className="text-gray-300 text-sm md:text-lg line-clamp-3 font-medium max-w-xl">
          {movie.overview}
        </p>
        
        <div className="flex gap-4 pt-4">
          <button className="px-8 py-3 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition">
            Watch Now
          </button>
          <button className="px-8 py-3 bg-white/10 text-white font-bold rounded-md backdrop-blur-md border border-white/10 hover:bg-white/20 transition">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;