import { Home, Tv, Search, User, Film } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/browse' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Tv, label: 'Series', path: '/media/tv' },
    { icon: Film, label: 'Movies', path: '/media/movie' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 h-10 
                      bg-linear-to-t from-app via-app/90 to-transparent 
                      backdrop-blur-[2px] pointer-events-none z-70" 
      />  
      <nav className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-70 w-[92%] max-w-sm pb-[env(safe-area-inset-bottom)]">
        <div className="relative group">
          <div className="absolute -inset-4 bg-app/50 rounded-full blur-2xl opacity-80" />
          <div className="relative flex items-center justify-around 
                          bg-surface-1/80 backdrop-blur-3xl 
                          border border-border p-2.5 
                          rounded-full 
                          shadow-[0_25px_50px_-12px_var(--shadow-color)]">
            
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative flex flex-col items-center justify-center transition-all duration-500 py-2 px-4 rounded-full ${
                    isActive ? 'text-accent' : 'text-muted hover:text-main'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-accent/10 rounded-full scale-110 blur-md animate-pulse" />
                  )}

                  <item.icon 
                    size={20}
                    className={`relative z-10 transition-all duration-500 ${
                      isActive ? 'scale-110 -translate-y-1.5' : 'scale-100'
                    }`}
                  />
                  
                  <span className={`text-[7px] font-black uppercase tracking-[0.2em] absolute -bottom-1 transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;