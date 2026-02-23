import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Heart, Star, Bookmark, MessageSquare, Share2 } from 'lucide-react';
import { useMediaStore } from '../store/useMediaStore';
import MovieDetailSkeleton from '../components/skeleton/MovieDetailSkeleton';
import MovieRow from '../components/movie/MovieRow';
import BackButton from '../components/shared/BackButton';
import { getImageUrl } from '../utils/getImageUrl';

const Details = () => {
  const { id, type } = useParams();
  const { selectedMedia, fetchDetails, isLoading } = useMediaStore();
  const [isFav, setIsFav] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (id && type) {
      fetchDetails(id, type);
      window.scrollTo(0, 0);
    }
  }, [id, type, fetchDetails]);

  if (isLoading || !selectedMedia) return <MovieDetailSkeleton />;

  const movie = selectedMedia;
  const year = (movie.release_date || movie.first_air_date)?.split('-')[0];

  return (
    <div className="min-h-screen bg-app text-main pb-24 transition-colors duration-500">
      <BackButton/>
      
      <section className="relative h-[80vh] w-full bg-cover bg-center bg-no-repeat" style={{ 
            backgroundImage: `url(${getImageUrl(
              window.innerWidth < 768 ? movie.poster_path : movie.backdrop_path, 
              'original'
            )})` 
          }} >
        
        {/* Dynamic Gradient Overlays using your theme variables */}
        <div className="absolute inset-0 transition-all duration-700">
          <div className="absolute inset-0 bg-linear-to-t from-app via-app/20 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-app/40 via-transparent to-transparent" />
        </div>

        {/* Action Buttons */}
        <div className="absolute top-8 right-6 md:right-16 flex gap-3 z-50">
          <button onClick={() => setIsFav(!isFav)} 
            className={`p-3 rounded-full border backdrop-blur-md transition-all ${isFav ? 'bg-rose-500 border-rose-500 text-white' : 'bg-surface/20 border-main/10 text-main hover:bg-main/10'}`}>
            <Heart size={20} fill={isFav ? "currentColor" : "none"} />
          </button>
          <button onClick={() => setIsBookmarked(!isBookmarked)} 
            className={`p-3 rounded-full border backdrop-blur-md transition-all ${isBookmarked ? 'bg-cinema-gold border-cinema-gold text-black' : 'bg-surface/20 border-main/10 text-main hover:bg-main/10'}`}>
            <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-6 md:left-16 max-w-5xl space-y-6 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase text-cinema-gold">
               <span>{type === 'movie' ? 'Motion Picture' : 'Television Series'}</span>
               <span className="w-8 h-px bg-cinema-gold/30" />
               <span>{year}</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-main drop-shadow-2xl">
              {movie.title || movie.name}
            </h1>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-cinema-gold" fill="currentColor" />
                <span className="md:text-2xl text-lg font-black text-main">{movie.vote_average?.toFixed(1)}</span>
                <span className="text-muted text-sm font-bold mt-1">/ 10</span>
              </div>
              <div className="h-4 w-px bg-main/10" />
              <div className="flex gap-2">
                {movie.genres?.slice(0, 3).map((g: any) => (
                  <span key={g.id} className="text-[10px] font-bold uppercase tracking-widest bg-main/5 border border-main/10 text-main px-3 py-1 rounded-full">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-8">
            {/* Play button stays high contrast */}
            <button className="group flex items-center gap-3 bg-main text-app md:px-10 px-6 md:py-4 py-3 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-cinema-gold active:scale-95 shadow-2xl">
              <Play size={18} fill="currentColor" strokeWidth={0} />
              Play
            </button>

            <button className="group flex items-center gap-3 bg-main/5 backdrop-blur-md border border-main/10 text-main md:px-10 px-6 md:py-4 py-3 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-main/10 active:scale-95">
              <Play size={18} className="text-cinema-gold" strokeWidth={2.5} />
              Trailer
            </button>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <div className="px-6 md:px-16 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-16">
          <section className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-dim italic">Narrative Overview</h3>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-muted italic">
              {movie.overview}
            </p>
          </section>

          {/* Cast Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-main/5 pb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-dim">Key Personnel</h3>
            </div>
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4">
              {movie.credits?.cast?.slice(0, 8).map((person: any) => (
                <div key={person.id} className="group shrink-0">
                  <div className="relative h-48 w-36 mb-4 overflow-hidden rounded-sm border border-main/5">
                    <img 
                      src={`https://image.tmdb.org/t/p/w300${person.profile_path}`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                      alt={person.name} 
                    />
                  </div>
                  <p className="text-xs font-black uppercase tracking-tighter text-main">{person.name}</p>
                  <p className="text-[10px] font-bold text-dim uppercase tracking-tighter">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <aside className="lg:col-span-4 space-y-12 bg-surface p-10 rounded-sm border border-main/5 h-fit shadow-xl">
           <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim">Tagline</p>
                <p className="text-lg font-bold italic text-cinema-gold">"{movie.tagline || 'N/A'}"</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim">Status</p>
                  <p className="font-bold text-main">{movie.status}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim">Length</p>
                  <p className="font-bold text-main">{movie.runtime || movie.episode_run_time?.[0]} min</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim">Studio</p>
                <p className="font-bold text-main">{movie.production_companies?.[0]?.name}</p>
              </div>
           </div>
        </aside>
      </div>

      {/* Recommendations */}
      <section className="px-6 md:px-16 mt-24 space-y-8">
        <div className="flex items-center gap-4">
           <h2 className="text-xs font-black uppercase tracking-[0.3em] text-dim italic">Relative Media</h2>
           <div className="flex-1 h-px bg-main/5" />
        </div>
        <MovieRow movies={movie.recommendations?.results || []} isLoading={false} />
      </section>
    </div>
  );
};

export default Details;