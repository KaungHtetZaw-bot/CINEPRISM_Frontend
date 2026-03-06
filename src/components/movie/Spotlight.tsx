import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import SpotlightSkeleton from '../skeleton/SpotlightSkeleton';
import { getImageUrl } from '../../utils/getImageUrl';
import { useAddToLists } from '../../queries/mediaQueries';

const Spotlight = ({ movie, isLoading }: { movie?: Movie; isLoading: boolean }) => {
  const navigate = useNavigate();
  const { mutate:addToRecent } = useAddToLists('recent');

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

      <div className="absolute inset-0 bg-linear-to-t 
        from-app 
        via-app/60 
        to-transparent" 
      />
      <div className="absolute inset-0 bg-linear-to-r 
        from-app 
        via-transparent 
        to-transparent" 
      />

      <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 space-y-1 max-w-3xl z-10">
        <h1 className="text-2xl md:text-6xl font-black text-main uppercase tracking-tighter">
          {movie.title || movie.name}
        </h1>
        
        <p className="text-dim text-xs md:text-lg line-clamp-3 font-medium max-w-xl">
          {movie.overview}
        </p>
        
        <div className="flex gap-4 pt-4 text-sm md:text-base">
          <button className="md:px-8 px-4 md:py-3 bg-accent text-black font-black italic uppercase rounded-sm hover:bg-accent-soft transition-all active:scale-95">
            Watch Now
          </button>
          
          <button 
            onClick={()=> moreInfo(movie)} 
            className="px-8 py-3 bg-surface-2/70 text-main font-bold rounded-sm backdrop-blur-md border border-border hover:bg-surface-2/90 transition"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;