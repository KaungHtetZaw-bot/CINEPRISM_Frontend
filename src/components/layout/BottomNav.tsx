import { Home, Tv, Search, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/browse' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Tv, label: 'Series', path: '/tv' },
    { icon: Heart, label: 'Library', path: '/library' },
  ];

  return (
    <nav className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-100 w-[92%] max-w-sm pb-[env(safe-area-inset-bottom)]">
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
                className={`relative flex flex-col items-center justify-center transition-all duration-300 py-2 px-4 rounded-full ${
                  isActive ? 'text-cinema-gold' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {/* Active Indicator Background */}
                {isActive && (
                  <div className="absolute inset-0 bg-white/5 rounded-full scale-110 animate-pulse" />
                )}

                <item.icon 
                  size={22} 
                  className={`relative z-10 transition-transform duration-500 ${
                    isActive ? 'scale-110 -translate-y-1' : 'scale-100'
                  }`}
                />
                
                {/* Label only shows when active to save space */}
                <span className={`text-[8px] font-bold uppercase tracking-widest absolute -bottom-1 transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
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