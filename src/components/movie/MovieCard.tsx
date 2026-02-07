import type { Movie } from '../../types/movie';


const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="group relative cursor-pointer rounded-xl overflow-hidden bg-surface transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-glass-border hover:border-cinema-gold">
      <div className="aspect-2/3 w-full overflow-hidden">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-sm leading-tight mb-1">{movie.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-cinema-gold font-bold text-xs">★ {movie.vote_average.toFixed(1)}</span>
          <button className="text-[10px] bg-white text-black px-2 py-1 rounded-md font-bold uppercase tracking-tighter">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;