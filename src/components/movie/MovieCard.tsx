import type { Movie } from '../../types/movie';
import { getImageUrl } from '../../utils/getImageUrl';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-xl border-1 border-(--text-main) hover:border-cinema-gold bg-(--bg-surface) transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50">
      <div className="w-full overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path, 'w500')} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-sm leading-tight mb-1">{movie.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-cinema-gold font-bold text-xs">★ {movie?.vote_average ? movie.vote_average.toFixed(1) : '0.0'}</span>
          <button className="text-[10px] bg-white text-black px-2 py-1 rounded-md font-bold uppercase tracking-tighter">
            Details
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default MovieCard;