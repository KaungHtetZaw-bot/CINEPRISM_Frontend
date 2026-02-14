import { Home, Film, Tv, Search, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/browse' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Film, label: 'Movies', path: '/movies' },
    { icon: Heart, label: 'My List', path: '/list' },
  ];

  return (
    <nav className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-100 w-[92%] max-w-sm">
      <div className="relative group">
        <div className="absolute -inset-1 bg-cinema-gold/10 rounded-full blur-xl opacity-50" />

        <div className="relative flex items-center justify-around 
                        bg-[#0f0f14]/60 backdrop-blur-2xl 
                        border border-white/10 p-3 
                        rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative flex flex-col items-center gap-1 transition-all duration-500 py-1 px-3 rounded-full ${
                  isActive ? 'text-cinema-gold' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {isActive && (
                   <span className="absolute inset-0 bg-cinema-gold/5 rounded-full blur-md" />
                )}

                <item.icon 
                   size={20} 
                   strokeWidth={isActive ? 2.5 : 2} 
                   className="relative z-10 transition-transform duration-300"
                />
                
                <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 h-0'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;