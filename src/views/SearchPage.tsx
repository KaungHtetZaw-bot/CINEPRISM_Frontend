import { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Spinner } from '../components/shared/Spinner';
import MovieGrid from '../components/movie/MovieGrid';
import { useSearch } from '../queries/mediaQueries';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => clearTimeout(handler);
  }, [query]);
  
  const { data: searchResults, isLoading,isFetching } = useSearch(debouncedQuery);
  return (
    <div className="min-h-screen bg-app p-6 md:p-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-muted group-focus-within:text-accent transition-colors">
            <SearchIcon size={24} />
          </div>
          <input
            type="text"
            placeholder="Search movies, shows, actors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-surface-1 border border-border rounded-2xl p-4 pl-14 text-xl text-main focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all backdrop-blur-xl"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-5 flex items-center text-muted hover:text-main"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading || (isFetching && debouncedQuery !== query) ? (
          <Spinner />
        ) : searchResults && searchResults.length > 0 ? (
          <MovieGrid movies={searchResults} isLoading={isLoading}/>
        ) : query ? (
          <div className="text-center py-20">
            <p className="text-muted text-xl font-medium">No results found for "{query}"</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-dim text-lg uppercase tracking-widest font-black italic">Start typing to discover</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;