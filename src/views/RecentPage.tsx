import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchRecentList, removeFromRecent } from '../store/slices/recentSlice';
import MovieCard from '../components/movie/MovieCard';
import { X } from 'lucide-react';
import type { Movie } from '../types/movie';

const RecentPage = () => {
  const dispatch = useAppDispatch();
  const { history, status } = useAppSelector((state) => state.recent);

  useEffect(() => {
    dispatch(fetchRecentList());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-app">
      <main className="flex-1 p-6 md:p-12">
        <h1 className="text-3xl font-black text-white uppercase italic mb-8">Continue Watching</h1>

        {status === 'loading' ? (
          <div className="text-white">Loading history...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {history.map((movie :Movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />
                <button 
                  onClick={() => dispatch(removeFromRecent({ id: movie.id, type: movie.type }))}
                  className="absolute top-2 right-2 p-1 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RecentPage;