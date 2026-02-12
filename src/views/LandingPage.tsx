import MovieRow from '../components/movie/MovieRow';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/movie/Hero';
import { useMovies } from '../hooks/useMovies';

const LandingPage = () => {
    const { movies, isLoading } = useMovies();
    const heroMovie = movies[0]; 
  return (
    <div className="min-h-screen bg-app text-white selection:bg-amber-400 selection:text-black">
      <Navbar />
      <section className="relative h-[110vh] w-full">
        <Hero movie={heroMovie} />
      </section>
      <main className="relative z-20 -mt-[15vh] bg-app rounded-t-[60px] md:rounded-t-[120px] shadow-[0_-50px_100px_rgba(0,0,0,0.9)] border-t border-white/5 min-h-225">
        <div className="pt-24 px-4 md:px-12 pb-24 max-w-350 mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full z-30 pointer-events-none">
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-32">
              <path
                d="M0 100 C 200 0, 800 0, 1000 100" 
                fill="none"
                stroke="url(#glowGradient)"
                strokeWidth="4"
                className="drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]"
              />
              <defs>
                <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
                  <stop offset="70%" stopColor="#FBBF24" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-400/50 via-amber-400/10 to-transparent blur-3xl pointer-events-none z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-175 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-500/20 via-amber-500/5 to-transparent pointer-events-none z-0" />
          <div className="relative z-40 flex flex-col mb-8 text-center md:text-left">
            <h3 className="text-5xl md:text-3xl font-black text-white tracking-tighter drop-shadow-2xl">
              Trending <span className="font-thin text-amber-400">Now</span>
            </h3>
          </div>
          <div className="relative z-40 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <MovieRow 
              movies={movies.slice(1, 7)} 
              isLoading={isLoading}
              limit={6}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage