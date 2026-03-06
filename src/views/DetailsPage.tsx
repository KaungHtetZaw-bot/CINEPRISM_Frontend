import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Heart, Star, Bookmark } from 'lucide-react';
import MovieDetailSkeleton from '../components/skeleton/MovieDetailSkeleton';
import MovieRow from '../components/movie/MovieRow';
import BackButton from '../components/shared/BackButton';
import { getImageUrl } from '../utils/getImageUrl';
import { useMediaDetails, useAddToLists } from '../queries/mediaQueries';

const Details = () => {
  const { id, type } = useParams<{ id: string; type: 'movie' | 'tv' }>();
  const [isFav, setIsFav] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: selectedMedia, isLoading } = useMediaDetails(type!, id!);
  const { mutate: addToWatchlist } = useAddToLists('watchlist');
  const { mutate: addToFavorite } = useAddToLists('favorite');

  const toggleWatchlist = () => {
    setIsBookmarked(!isBookmarked);
    addToWatchlist(selectedMedia!);
  };

  const toggleFavorite = () => {
    setIsFav(!isFav);
    addToFavorite(selectedMedia!);
  };

  if (isLoading || !selectedMedia) return <MovieDetailSkeleton />;

  const movie = selectedMedia;
  const year = (movie.release_date || movie.first_air_date)?.split('-')[0];

  return (
    <div className="min-h-screen bg-app text-main pb-20 transition-colors duration-500">
      <BackButton />

      {/* --- HERO SECTION --- */}
      <section 
        className="relative h-[70vh] md:h-[80vh] w-full bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: `url(${getImageUrl(
            window.innerWidth < 768 ? movie.poster_path : movie.backdrop_path, 
            'original'
          )})` 
        }} 
      >
        {/* Overlays */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-app via-app/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-app/80 md:from-app/60 via-transparent to-transparent" />
        </div>

        {/* Floating Actions (Mobile optimized) */}
        <div className="absolute top-6 right-4 md:top-8 md:right-16 flex gap-2 md:gap-3 z-50">
          <button onClick={toggleFavorite} 
            className={`p-2.5 md:p-3 rounded-full border backdrop-blur-md transition-all active:scale-90 ${isFav ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-surface-1/50 border-border text-main'}`}>
            <Heart size={18} fill={isFav ? "currentColor" : "none"} />
          </button>
          <button onClick={toggleWatchlist} 
            className={`p-2.5 md:p-3 rounded-full border backdrop-blur-md transition-all active:scale-90 ${isBookmarked ? 'bg-accent border-accent text-black shadow-lg shadow-accent/20' : 'bg-surface-1/50 border-border text-main'}`}>
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-16 pb-8 md:pb-12 z-10">
          <div className="max-w-5xl space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-accent">
              <span>{type === 'movie' ? 'Motion Picture' : 'Television Series'}</span>
              <span className="w-6 md:w-8 h-px bg-accent/30" />
              <span>{year}</span>
            </div>
            
            <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-main drop-shadow-2xl">
              {movie.title || movie.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-accent" fill="currentColor" />
                <span className="text-xl md:text-2xl font-black text-main">{movie.vote_average?.toFixed(1)}</span>
                <span className="text-muted text-[10px] md:text-sm font-bold mt-1">/ 10</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-border" />
              <div className="flex flex-wrap gap-2">
                {movie.genres?.slice(0, 2).map((g: any) => (
                  <span key={g.id} className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-surface-2/50 backdrop-blur-sm border border-border text-main px-2.5 py-1 rounded-full">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6 mt-6 md:mt-8">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-accent text-black px-6 md:px-10 py-3 md:py-4 rounded-sm font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-2xl">
                <Play size={16} fill="currentColor" strokeWidth={0} /> Play
              </button>

              <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-surface-1/50 backdrop-blur-md border border-border text-main px-6 md:px-10 py-3 md:py-4 rounded-sm font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95">
                <Play size={16} className="text-accent" strokeWidth={2.5} /> Trailer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT GRID --- */}
      <div className="px-6 md:px-16 mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        
        {/* Main Narrative Column */}
        <div className="lg:col-span-8 space-y-12 md:space-y-16">
          <section className="space-y-4 md:space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-dim italic">Narrative Overview</h3>
            <p className="text-lg md:text-3xl font-light leading-relaxed text-muted italic">
              {movie.overview}
            </p>
          </section>

          {/* Cast Section */}
          <section className="space-y-6 md:space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-dim">Key Personnel</h3>
            </div>
            <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0">
              {movie.credits?.cast?.slice(0, 10).map((person: any) => (
                <div key={person.id} className="group shrink-0 w-28 md:w-36">
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-sm border border-border">
                    <img 
                      src={`https://image.tmdb.org/t/p/w300${person.profile_path}`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                      alt={person.name} 
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-tighter text-main truncate">{person.name}</p>
                  <p className="text-[8px] md:text-[10px] font-bold text-dim uppercase tracking-wider line-clamp-1 italic">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column (Reflows below main content on mobile) */}
        <aside className="lg:col-span-4 h-fit">
          <div className="bg-surface-1 p-6 md:p-10 rounded-sm border border-border shadow-xl space-y-8">
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-dim">Tagline</p>
              <p className="text-base md:text-lg font-bold italic text-accent leading-tight">
                {movie.tagline ? `"${movie.tagline}"` : 'N/A'}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-dim">Status</p>
                <p className="text-sm md:text-base font-bold text-main">{movie.status}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-dim">Length</p>
                <p className="text-sm md:text-base font-bold text-main">{movie.runtime || movie.episode_run_time?.[0] || 'N/A'} min</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-dim">Studio</p>
              <p className="text-sm md:text-base font-bold text-main">
                {movie.production_companies?.[0]?.name || 'Unknown'}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* --- RECOMMENDATIONS --- */}
      <section className="px-6 md:px-16 mt-16 md:mt-24 space-y-6 md:space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-dim italic">Relative Media</h2>
          <div className="flex-1 h-[1px] bg-border" />
        </div>
        {/* Negative margin on mobile to allow edge-to-edge scrolling if MovieRow supports it */}
        <div className="-mx-6 px-6 md:mx-0 md:px-0">
          <MovieRow movies={movie.recommendations?.results || []} isLoading={false} />
        </div>
      </section>
    </div>
  );
};

export default Details;