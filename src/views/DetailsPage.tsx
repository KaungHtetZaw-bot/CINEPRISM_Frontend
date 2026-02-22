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
    <div className="min-h-screen bg-app text-zinc-100 pb-24">
      <BackButton/>
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(window.innerWidth < 768 ? movie.poster_path : movie.backdrop_path, 'original')}
            className="w-full h-full md:object-cover object-fill"
            alt="backdrop"
          />
          <div className="absolute inset-0 bg-linear-to-t from-app via-app/10 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-app/30 via-transparent to-black/10" />
        </div>

        <div className="absolute top-8 right-6 md:right-16 flex gap-3">
          <button onClick={() => setIsFav(!isFav)} className={`p-3 rounded-full border backdrop-blur-md transition-all ${isFav ? 'bg-rose-500 border-rose-500 text-white' : 'bg-black/20 border-white/10 text-white hover:bg-white/10'}`}>
            <Heart size={20} fill={isFav ? "currentColor" : "none"} />
          </button>
          <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-3 rounded-full border backdrop-blur-md transition-all ${isBookmarked ? 'bg-cinema-gold border-cinema-gold text-black' : 'bg-black/20 border-white/10 text-white hover:bg-white/10'}`}>
            <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          <button className="p-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white hover:bg-white/10">
            <Share2 size={20} />
          </button>
        </div>

        <div className="absolute bottom-0 left-6 md:left-16 max-w-5xl space-y-6">
          <div className="space-y-4 max-w-93">
            <div className="flex items-center gap-4 text-xs font-black tracking-[0.3em] uppercase text-cinema-gold">
               <span>{type === 'movie' ? 'Motion Picture' : 'Television Series'}</span>
               <span className="w-8 h-px bg-cinema-gold/30" />
               <span>{year}</span>
            </div>
            
            <h1 className="text-5xl sm:text-5xl md:text-7xl lg-text-9xl font-black italic tracking-tighter uppercase leading-[0.85] text-white">
              {movie.title || movie.name}
            </h1>

            <div className="md:flex block items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-cinema-gold" fill="currentColor" />
                <span className="md:text-2xl text-lg font-black">{movie.vote_average?.toFixed(1)}</span>
                <span className="text-zinc-500 text-sm font-bold mt-1">/ 10</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex gap-2">
                {movie.genres?.slice(0, 3).map((g: any) => (
                  <span key={g.id} className="text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-8">
            <button className="group flex items-center gap-3 bg-white text-black md:px-10 px-6 md:py-4 py-3 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-cinema-gold active:scale-95 shadow-2xl">
              <Play size={18} fill="black" strokeWidth={0} />
              Play
            </button>

            <button className="group flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-white md:px-10 px-6 md:py-4 py-3 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
              <Play size={18} className="text-cinema-gold" strokeWidth={2.5} />
              Trailer
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-white/10 h-10">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-zinc-400 font-black uppercase text-[9px] tracking-[0.2em]">
                  <MessageSquare size={14} className="text-cinema-gold/60" />
                  <span>{movie.vote_count.toLocaleString()} Critiques</span>
                </div>
                <div className="h-0.5 w-full bg-cinema-gold/20 mt-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cinema-gold" 
                    style={{ width: `${(movie.vote_average * 10)}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-16 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-16">
          <section className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 italic">Narrative Overview</h3>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-zinc-300 italic">
              {movie.overview}
            </p>
          </section>

          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Key Personnel</h3>
              <span className="text-[10px] text-zinc-600 font-bold uppercase">Cast & Credits</span>
            </div>
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4">
              {movie.credits?.cast?.slice(0, 8).map((person: any) => (
                <div key={person.id} className="group">
                  <div className="relative h-48 w-36 mb-4 overflow-hidden rounded-sm">
                    <img 
                      src={`https://image.tmdb.org/t/p/w300${person.profile_path}`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                      alt={person.name} 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-tighter text-white">{person.name}</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-12 bg-white/5 p-10 rounded-sm border border-white/5 h-fit">
           <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Tagline</p>
                <p className="text-lg font-bold italic text-cinema-gold">"{movie.tagline || 'N/A'}"</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Status</p>
                  <p className="font-bold text-white">{movie.status}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Length</p>
                  <p className="font-bold text-white">{movie.runtime || movie.episode_run_time?.[0]} min</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Studio</p>
                <p className="font-bold text-white">{movie.production_companies?.[0]?.name}</p>
              </div>
           </div>
        </aside>
      </div>

      <section className="px-6 md:px-16 mt-24 space-y-8">
        <div className="flex items-center gap-4">
           <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 italic">Relative Media</h2>
           <div className="flex-1 h-px bg-white/5" />
        </div>
        <MovieRow 
          movies={movie.recommendations?.results || []} 
          isLoading={false} 
        />
      </section>
    </div>
  );
};

export default Details;