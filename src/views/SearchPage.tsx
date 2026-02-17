import { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useMediaStore } from '../store/useMediaStore';
import { Spinner } from '../components/shared/Spinner';
import MovieGrid from '../components/movie/MovieGrid';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const { searchMedia, searchResults, isLoading, clearSearch } = useMediaStore();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (query) searchMedia(query);
      else clearSearch();
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <div className="min-h-screen bg-app p-6 md:p-12">
      <div className="max-w-4xl mx-auto mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-cinema-gold transition-colors">
            <SearchIcon size={24} />
          </div>
          <input
            type="text"
            placeholder="Search movies, shows, actors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xl focus:outline-none focus:ring-2 focus:ring-cinema-gold/50 focus:border-cinema-gold transition-all backdrop-blur-xl"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-5 flex items-center text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          < Spinner />
        ) : searchResults.length > 0 ? (
          <MovieGrid movies={searchResults} isLoading={isLoading}/>
        ) : query ? (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-xl font-medium">No results found for "{query}"</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-600 text-lg uppercase tracking-widest font-black italic">Start typing to discover</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;