import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Plus, Star, Info, Calendar } from 'lucide-react';
import { useMediaStore } from '../store/useMediaStore';
// import MovieRow from '../components/movie/MovieRow';

const Details = () => {
  const { id, type } = useParams();
  const { selectedMedia, fetchDetails, isLoading } = useMediaStore();

  useEffect(() => {
    if (id && type) {
      fetchDetails(id, type);
      window.scrollTo(0, 0);
    }
  }, [id, type, fetchDetails]);

  if (isLoading || !selectedMedia) {
    return <div className="h-screen flex items-center justify-center bg-app text-cinema-gold">Loading...</div>;
  }

  const movie = selectedMedia;

  return (
    <div className="relative pb-20">
      <div className="relative h-[85vh] w-full overflow-hidden">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-app via-app/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-app/80 via-transparent to-transparent" />

        <div className="absolute bottom-20 left-6 md:left-16 right-6 max-w-4xl space-y-6">
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase text-white drop-shadow-2xl">
            {movie.title || movie.name}
          </h1>

          <div className="flex items-center gap-6 text-cinema-gold font-bold">
            <div className="flex items-center gap-1">
              <Star size={20} fill="currentColor" />
              <span>{movie.vote_average?.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Calendar size={18} />
              <span>{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</span>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-200 line-clamp-3 leading-relaxed max-w-2xl drop-shadow-lg">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-3 px-10 py-4 bg-white text-black font-black uppercase rounded-full hover:bg-cinema-gold transition-all hover:scale-105 active:scale-95">
              <Play size={20} fill="black" />
              Watch Now
            </button>
            <button className="flex items-center gap-3 px-10 py-4 bg-white/10 text-white font-black uppercase rounded-full border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">
              <Plus size={20} />
              Add to List
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 -mt-10 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-cinema-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <Info size={16} /> Information
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Genres</span>
                <span className="text-white">{movie.genres?.map((g: any) => g.name).join(', ')}</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Status</span>
                <span className="text-white">{movie.status}</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Runtime</span>
                <span className="text-white">{movie.runtime || movie.episode_run_time?.[0]} mins</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Recommended Content (Using your existing MovieRow) */}
        {/* {movie.recommendations?.results && (
          <div>
            <h2 className="text-2xl font-black text-white italic uppercase mb-4">Recommended For You</h2>
            <MovieRow movies={movie.recommendations.results} isLoading={false} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Details;