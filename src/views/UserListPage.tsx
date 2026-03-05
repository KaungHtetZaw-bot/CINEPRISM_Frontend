import MovieSkeleton from '../components/skeleton/MovieSkeleton';
import MovieGrid from '../components/movie/MovieGrid';
import { useGetLists } from '../queries/mediaQueries';
import { useParams } from 'react-router-dom';

type FlagType = 'recent' | 'watchlist' | 'favorite';


const UserListPage = () => {
    const { type } = useParams<{ type: string }>();
    const { data: history, isLoading } = useGetLists(type as FlagType || 'recent');

  return (
    <div className="p-4 md:p-6 min-h-screen bg-app transition-colors duration-500">
      <div className="relative mb-10 md:mb-16">
        {/* The Top Label */}
        <div className="flex items-center gap-2 mb-3 ml-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/70">
            Personal Collection
            </span>
            <div className="h-px w-12 bg-accent/30" />
        </div>

        {/* Dynamic Title */}
        <h1 className="text-2xl md:text-4xl font-heading font-black uppercase italic tracking-tightest leading-none">
            {type === 'recent' && (
            <>Recently <span className="text-accent">Viewed</span></>
            )}
            {type === 'watchlist' && (
            <>My <span className="text-accent">Watchlist</span></>
            )}
            {type === 'favorite' && (
            <>User <span className="text-accent">Favorites</span></>
            )}
        </h1>

        {/* Accent Underline */}
        <div className="absolute -bottom-4 left-1 h-1.5 w-24 bg-accent rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
        </div>
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

export default UserListPage;