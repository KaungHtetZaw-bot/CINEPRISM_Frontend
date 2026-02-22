import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import SpotlightSkeleton from '../skeleton/SpotlightSkeleton';
import { useMediaStore } from "../../store/useMediaStore";
import { getImageUrl } from '../../utils/getImageUrl';

const Spotlight = ({ movie, isLoading }: { movie?: Movie; isLoading: boolean }) => {
  const { addToRecent } = useMediaStore();
  const navigate = useNavigate();
  const moreInfo = (movie:Movie) => {
    addToRecent(movie);
    const mediaType = movie.type || movie.media_type || (movie.title ? 'movie' : 'tv');
    
    navigate(`/details/${mediaType}/${movie.id}`);
  }
  if (isLoading || !movie) {
    return <SpotlightSkeleton />;
  }

  return (
    <div className="relative md:h-[85vh] h-[50vh] w-full overflow-hidden">
      <img 
        src={getImageUrl(movie.backdrop_path,"original")} 
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-app via-app/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-app/80 via-transparent to-transparent" />

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
          <button onClick={()=> moreInfo(movie)} className="px-8 py-3 bg-white/10 text-white font-bold rounded-md backdrop-blur-md border border-white/10 hover:bg-white/20 transition">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;