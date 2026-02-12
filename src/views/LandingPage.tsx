import MovieRow from '../components/movie/MovieRow';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/movie/Hero';
import { useMovies } from '../hooks/useMovies';
import { ChevronRight } from 'lucide-react';
import tvDisplay from '../assets/images/tv_display.png';

const LandingPage = () => {
  const FeatureSection = () => {
      return (
        <section className="md:py-16 py-8 px-4 md:px-24 bg-app">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Enjoy on your <span className="text-cinema-gold">TV.</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted font-medium">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
              </p>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/20 blur-[100px] -z-10" />
              
              <div className="relative z-10 rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl">
                <img 
                  src={tvDisplay} 
                  alt="TV Display" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      );
    };
  const Footer = () => {
    const links = [
      ['FAQ', 'Investor Relations', 'Ways to Watch', 'Corporate Information', 'Only on Netflix'],
      ['Help Center', 'Jobs', 'Terms of Use', 'Contact Us'],
      ['Account', 'Redeem Gift Cards', 'Privacy', 'Speed Test'],
      ['Media Center', 'Buy Gift Cards', 'Cookie Preferences', 'Legal Notices']
    ];

    return (
      <footer className="bg-app pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-250 mx-auto">
          <p className="text-dim mb-8 hover:underline cursor-pointer">
            Questions? Contact us.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {links.map((column, colIndex) => (
              <ul key={colIndex} className="flex flex-col gap-3">
                {column.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-dim text-sm hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="mb-8">
            <div className="relative inline-block">
              <select className="bg-black border border-white/20 text-dim text-sm py-2 pl-4 pr-10 rounded-md appearance-none focus:ring-1 focus:ring-cinema-gold outline-none">
                <option>English</option>
                <option>Myanmar (Burma)</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-dim text-xs">
            © 2026 YourCinema. All rights reserved. Built with precision for the best viewing experience.
          </p>
        </div>
      </footer>
    );
  };
    const { movies, isLoading } = useMovies();
    const heroMovie = movies[0]; 
  return (
    <div className="min-h-screen bg-app text-white selection:bg-amber-400 selection:text-black">
      <Navbar />
      <section className="relative h-[110vh] w-full">
        <Hero movie={heroMovie} />
      </section>
      <main className="relative px-4 md:px-12 z-20 -mt-[15vh] bg-app rounded-t-[60px] md:rounded-t-[120px] shadow-[0_-50px_100px_rgba(0,0,0,0.9)]">
        <div className="pt-24 md:pb-24 pb-10 max-w-350 mx-auto relative overflow-hidden">
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
                  <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-175 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-500/20 via-amber-500/5 to-transparent pointer-events-none z-0" />
          <div className="relative z-40 flex flex-col mb-12 md:px-15 px-4 md:text-left text-center items-center md:items-start gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter">
              Trending <span className="bg-linear-to-r from-cinema-gold to-amber-500 bg-clip-text text-transparent pr-1">Now</span>
            </h3>
          </div>
          <div className="relative z-40 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <MovieRow 
              movies={movies.slice(1, 11)} 
              isLoading={isLoading}
              limit={6}
            />
          </div>
        </div>
        <FeatureSection />
        <section className="py-10 md:py-20 text-center px-4 bg-app">
          <h3 className="text-xl md:text-2xl mb-8 font-medium max-w-2xl mx-auto">
            Ready to watch? Enter your email to create or restart your membership.
          </h3>
          <div className="flex flex-col md:flex-row gap-2 max-w-3xl mx-auto h-auto md:h-16">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 bg-black/40 border border-white/20 px-6 py-4 text-white rounded-md md:rounded-l-sm focus:outline-none focus:ring-2 ring-cinema-gold transition-all"
            />
            <button className="bg-cinema-gold text-black font-black px-10 py-4 text-xl md:text-2xl flex items-center justify-center gap-2 hover:bg-gold-light transition-all rounded-md md:rounded-r-sm active:scale-95">
              Get Started <ChevronRight size={28} />
            </button>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default LandingPage