import { useEffect } from 'react';
import { useMediaStore } from '../store/useMediaStore';
import MovieSkeleton from '../components/skeleton/MovieSkeleton';
import MovieGrid from '../components/movie/MovieGrid';

const RecentPage = () => {
  const { history, isLoading, fetchRecent } = useMediaStore();

  useEffect(() => {
    fetchRecent();
  }, []);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-app transition-colors duration-500">
      <h1 className="md:text-3xl text-lg text-main font-black uppercase md:mb-8 mb-4 tracking-tighter italic">
        Recently Viewed
      </h1>
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`skeleton-${i}`}>
              <MovieSkeleton />
            </div>
            
          ))}
        </div>
      ) : history.length > 0 ? (
        <MovieGrid movies={history} isLoading={false}/>
      ) : (
        <div className="col-span-full py-20 text-center">
          <p className="text-muted text-xs font-black uppercase tracking-[0.3em]">No history found</p>
        </div>
      )}
    </div>
  );
};

export default RecentPage;

