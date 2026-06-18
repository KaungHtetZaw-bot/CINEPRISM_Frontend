import { useState } from 'react';
import { useGenres } from '../api/mediaQueries';

interface Genre {
  id: number;
  name: string;
}

type MediaType = 'movie' | 'tv';

export default function GenresPage() {
  const [activeTab, setActiveTab] = useState<MediaType>('movie');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  // Dynamically fetch based on the active tab state
  const { data: genresData = [] } = useGenres(activeTab);

  const handleTabChange = (type: MediaType) => {
    setActiveTab(type);
    setSelectedGenre(null); // Clear selected filter when changing category
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans px-6 py-12 md:px-12 lg:px-24 selection:bg-[#e2b616] selection:text-black">

      {/* Header Section */}
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          Explore <span className="text-[#e2b616]">Genres</span>
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
            ? 'bg-[#e2b616] text-neutral-950 shadow-md'
            : 'text-neutral-400 hover:text-neutral-200'
            }`}
        >
          Movies
        </button>
        <button
          onClick={() => handleTabChange('tv')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 uppercase tracking-wider focus:outline-none ${activeTab === 'tv'
            ? 'bg-[#e2b616] text-neutral-950 shadow-md'
            : 'text-neutral-400 hover:text-neutral-200'
            }`}
        >
          TV Shows
        </button>
      </div>

      {/* Grid Layout */}
      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {genresData.map((genre: Genre) => {
          const isSelected = selectedGenre === genre.id;

          return (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`
                relative group flex flex-col justify-end items-start p-6 h-36 rounded-xl transition-all duration-300 ease-out border overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[#e2b616] focus:ring-offset-2 focus:ring-offset-neutral-950
                ${isSelected
                  ? 'bg-neutral-900 border-[#e2b616] shadow-lg shadow-[#e2b616]/10'
                  : 'bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-900 hover:border-neutral-700'
                }
              `}
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#e2b616]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Corner Accent Line */}
              <div
                className={`absolute top-0 right-0 h-1 w-12 transition-all duration-300 ${isSelected ? 'bg-[#e2b616]' : 'bg-transparent group-hover:bg-neutral-700'
                  }`}
              />

              {/* Decorative Minimalist ID Indicator */}
              <span className={`text-[10px] uppercase tracking-widest font-bold mb-auto transition-colors duration-300 ${isSelected ? 'text-[#e2b616]' : 'text-neutral-600 group-hover:text-neutral-500'
                }`}>
                CP-{genre.id}
              </span>

              {/* Genre Name */}
              <h3 className={`text-lg font-bold tracking-wide transition-colors duration-200 ${isSelected ? 'text-[#e2b616]' : 'text-neutral-200 group-hover:text-white'
                }`}>
                {genre.name}
              </h3>
            </button>
          );
        })}
      </main>

      {/* Quick Status / Flow Integration Note */}
      {selectedGenre && (
        <div className="mt-12 p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg flex items-center justify-between">
          <p className="text-neutral-300 text-sm font-medium">
            Filtering <span className="text-white font-bold uppercase">{activeTab === 'movie' ? 'Movie' : 'TV Show'}</span> catalog by: <span className="text-[#e2b616] font-bold">
              {genresData.find((g: Genre) => g.id === selectedGenre)?.name}
            </span>
          </p>
          <button
            onClick={() => setSelectedGenre(null)}
            className="text-xs text-neutral-500 hover:text-white uppercase font-bold tracking-wider transition-colors"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
}