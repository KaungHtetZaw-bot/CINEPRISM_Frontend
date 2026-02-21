import { useEffect } from 'react';
import { useMediaStore } from '../store/useMediaStore';
import MovieCard from '../components/movie/MovieCard';
import { X } from 'lucide-react';
import type { Movie } from '../types/movie';
import {useMediaNavigation} from '../utils/clickMovie'

const RecentPage = () => {
  const {goToDetails} = useMediaNavigation()
  const { history, isLoading, removeFromRecent } = useMediaStore();

  useEffect(() => {
    console.log('Fetching recent list...');
  }, []);

  return (
    <>
      <div className="p-4 md:p-12">
         <h1 className="text-3xl font-black uppercase mb-8">Recently Viewed</h1>
          {isLoading ? (
            <div className="text-white">Loading history...</div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {history.map((movie :Movie) => (
                <div key={movie.id} className="relative group">
                  <div onClick={()=>goToDetails(movie)}>
                    <MovieCard movie={movie} />
                  </div>
                  <button 
                    onClick={() => removeFromRecent(movie.id, movie.type || movie.media_type || 'movie')}
                    className="absolute top-2 right-2 p-1 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
      </div>
    </>
  );
};

export default RecentPage;

