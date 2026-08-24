import { useGenres } from '../api/mediaQueries';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { slugify } from '../utils/slug';

interface Genre {
  id: number;
  name: string;
}

type MediaType = 'movie' | 'tv';

export default function GenresPage() {
  const navigate = useNavigate()
  const { type: urlType } = useParams<{ type: string }>();
  const isValidType = urlType === 'movie' || urlType === 'tv';
  const activeTab = (isValidType ? urlType : 'movie') as MediaType;
  const { data: genresData = [] } = useGenres(activeTab);

  if (!isValidType) {
    return <Navigate to="/media/genres/movie" replace />;
  }

  const handleTabChange = (type: MediaType) => {
    navigate(`/media/genres/${type}`, { replace: false });
  };

  const showByGenre = (genre: Genre) => {
    navigate(`/media/${activeTab}/genre/${genre.id}/${slugify(genre.name)}`);
  }

  return (
    <div className="min-h-screen bg-app text-main font-sans px-6 py-12 md:px-12 lg:px-24 selection:bg-accent selection:text-black">

      {/* Header Section */}
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          Explore <span className="text-accent">Genres</span>
        </h1>
        <p className="text-neutral-400 text-lg font-normal leading-relaxed">
          Select a category to discover your next favorite cinematic masterpiece, curated directly from the CinePrism database.
        </p>
      </header>

      {/* Modern Tab Switcher */}
      <div className="flex mb-8 bg-neutral-900/60 p-1 rounded-xl border border-neutral-800/80 max-w-xs">
        <button
          onClick={() => handleTabChange('movie')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 uppercase tracking-wider focus:outline-none ${activeTab === 'movie'
            ? 'bg-accent text-neutral-950 shadow-md'
            : 'text-neutral-400 hover:text-neutral-200'
            }`}
        >
          Movies
        </button>
        <button
          onClick={() => handleTabChange('tv')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 uppercase tracking-wider focus:outline-none ${activeTab === 'tv'
            ? 'bg-accent text-neutral-950 shadow-md'
            : 'text-neutral-400 hover:text-neutral-200'
            }`}
        >
          TV Shows
        </button>
      </div>

      {/* Grid Layout */}
      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {genresData.map((genre: Genre) => {
          return (
            <button
              key={genre.id}
              onClick={() => showByGenre(genre)}
              className="
                relative group flex flex-col justify-end items-start p-6 h-36 rounded-xl transition-all duration-300 ease-out border overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-neutral-950
                bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-900 hover:border-neutral-700
              "
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Corner Accent Line */}
              <div className="absolute top-0 right-0 h-1 w-12 transition-all duration-300 bg-transparent group-hover:bg-accent" />

              {/* Decorative Minimalist ID Indicator */}
              <span className="text-[10px] uppercase tracking-widest font-bold mb-auto transition-colors duration-300 text-neutral-600 group-hover:text-accent">
                CP-{genre.id}
              </span>

              {/* Genre Name */}
              <h3 className="text-lg font-bold tracking-wide transition-colors duration-200 text-neutral-200 group-hover:text-accent">
                {genre.name}
              </h3>
            </button>
          );
        })}
      </main>
    </div>
  );
}