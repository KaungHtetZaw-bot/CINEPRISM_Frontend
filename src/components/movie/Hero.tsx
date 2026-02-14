import { useState } from 'react';
import { getImageUrl } from '../../utils/imagePath';
import { useNavigate } from 'react-router-dom';
const Hero = ({ movie }: { movie: any }) => {
  const isLoading = !movie;
  const navigate = useNavigate();
  const [email,setEmail] = useState<string>('');
    const goWithEmail = () => {
      navigate('/register', { state: { email } });
      if (email.trim()) {
      navigate('/register', { state: { email } });
    }
    };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-app">
      {isLoading ? (
        <div className="w-full h-full bg-surface" />
      ) : (
        <img 
          src={getImageUrl(movie.backdrop_path, 'original')}
          className="w-full h-full object-cover animate-in fade-in duration-1000 scale-105"
          alt="Hero Background"
        />
      )}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 bg-linear-to-t from-app via-app/20 to-transparent z-10" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
        <div className="max-w-3xl space-y-6 animate-in fade-in zoom-in duration-1000">
          
          <p className="text-cinema-gold font-bold tracking-[0.4em] uppercase text-sm">
            Unlimited Entertainment
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
            Movies, TV shows, <br /> and more.
          </h1>
          
          <p className="text-xl text-white/90 font-medium max-w-xl mx-auto">
            Watch anywhere. Cancel anytime. Ready to watch? Enter your email to start your membership.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-2xl mx-auto pt-4">
            <div className="relative w-full">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                className="w-full px-6 py-5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white outline-none focus:border-cinema-gold transition-all text-lg"
              />
            </div>
            <button onClick={()=>goWithEmail()} className="w-full md:w-auto max-w-50 whitespace-nowrap bg-cinema-gold text-black md:px-10 px-5 md:py-5 py-2.5 rounded-xl font-extrabold text-lg hover:bg-gold-light hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
              Get Started
              <span className="text-2xl">›</span>
            </button>
          </div>
          <p className="text-sm text-white/60">
            Only new members are eligible for this offer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;