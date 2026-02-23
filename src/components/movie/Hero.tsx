import { useState } from 'react';
import { getImageUrl } from '../../utils/getImageUrl';
import { useNavigate } from 'react-router-dom';

const Hero = ({ movie }: { movie: any }) => {
  const isLoading = !movie;
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');

  const goWithEmail = () => {
    if (email.trim()) {
      navigate('/register', { state: { email } });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-app transition-colors duration-500">
      {/* 1. Backdrop Image with Theme-aware Overlay */}
      {isLoading ? (
        <div className="w-full h-full bg-surface animate-pulse" />
      ) : (
        <div className="relative w-full h-full">
          <img 
            src={getImageUrl(movie.backdrop_path, 'original')}
            className="w-full h-full object-cover animate-in fade-in duration-1000 scale-105"
            alt="Hero Background"
          />
          {/* Obsidian Overlay: Darker in dark mode, subtle in light mode */}
          <div className="absolute inset-0 bg-app/40 z-10 transition-colors" />
          <div className="absolute inset-0 bg-linear-to-t from-app via-app/40 to-transparent z-10" />
        </div>
      )}
      
      {/* 2. Content Center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
        <div className="max-w-3xl space-y-6 animate-in fade-in zoom-in duration-1000">
          
          <p className="text-cinema-gold font-black tracking-[0.4em] uppercase text-[10px] md:text-xs italic">
            Unlimited Entertainment
          </p>
          
          <h1 className="text-5xl md:text-8xl font-black text-main tracking-tighter drop-shadow-2xl uppercase italic leading-[0.9]">
            Movies, TV shows, <br /> and more.
          </h1>
          
          <p className="text-lg md:text-xl text-muted font-medium max-w-xl mx-auto italic">
            Watch anywhere. Cancel anytime. Ready to watch? Enter your email to start.
          </p>

          {/* 3. The Registration Input Group */}
          <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-2xl mx-auto pt-6">
            <div className="relative w-full group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                className="w-full px-6 py-5 rounded-sm bg-surface/50 backdrop-blur-xl border border-main/10 text-main outline-none focus:border-cinema-gold transition-all text-lg placeholder:text-dim"
              />
              {/* Obsidian underline effect */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-cinema-gold w-0 group-focus-within:w-full transition-all duration-500" />
            </div>

            <button 
              onClick={goWithEmail} 
              className="w-full md:w-auto whitespace-nowrap bg-main text-app md:px-12 px-5 md:py-5 py-3 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] hover:bg-cinema-gold hover:text-black active:scale-95 transition-all flex items-center justify-center gap-2 shadow-2xl"
            >
              Get Started
              <span className="text-xl">›</span>
            </button>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-widest text-dim italic">
            Only new members are eligible for this offer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;