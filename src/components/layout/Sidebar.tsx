import { Home, Film, Tv, Clock, Heart, Settings, ChevronLeft, Search, Crown, Bookmark, LayoutGrid, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../../store/useAuthStore';

const Sidebar = () => {
  const { user,logout } = useAuthStore();
  const isVip = user?.is_vip;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const calculateTimeLeft = () => {
    if (!user?.vip_expires_at) return null;
    
    // Parse the ISO string (JS handles the 'Z' as UTC automatically)
    const expiry = new Date(user.vip_expires_at).getTime();
    
    // Get current time in UTC
    const now = new Date().getTime(); 
    
    const diff = expiry - now;

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m remaining`;
};
  useEffect(() => {
    if (user?.is_vip) {
      setTimeLeft(calculateTimeLeft() || "");
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft() || "");
      }, 60000); // Update every minute
      return () => clearInterval(timer);
    }
  }, [user]);

  const menuItems = [
    { 
      icon: Crown, 
      label: isVip ? 'VIP Status' : 'Upgrade to VIP', 
      path: isVip ? '/profile/subscription' : '/vip-purchase',
      isPremium: true
    },
    { icon: Home, label: 'Home', path: '/browse' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Film, label: 'Movies', path: '/media/movie' },
    { icon: Tv, label: 'TV Shows', path: '/media/tv' },
    { icon: LayoutGrid, label: 'Genres', path: '/media/genres' },    
    { icon: Clock, label: 'Recent', path: '/mylist/recent' },
    { icon: Heart, label: 'Favorite', path: '/mylist/favorite' },
    { icon: Bookmark, label: 'Bookmark', path: '/mylist/watchlist' },
  ];

  return (
    <aside className={`
      ${isCollapsed ? 'w-20' : 'w-64'} 
      transition-all duration-200 bg-surface-1 border-r border-border/50 
      flex flex-col h-screen sticky top-0 z-50 overflow-hidden
    `}>
      <div className="p-6 flex items-center justify-between min-h-24">
        {!isCollapsed && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <Logo />
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 hover:bg-accent/10 rounded-xl text-dim hover:text-accent transition-all active:scale-90 border border-transparent hover:border-accent/20"
        >
          <ChevronLeft size={20} className={`${isCollapsed ? 'rotate-180' : ''} transition-transform duration-500`} />
        </button>
      </div>

      {user?.is_vip === 1 && !isCollapsed &&  (
        <div className="mx-4 mt-auto mb-4 p-4 rounded-2xl bg-linear-to-br from-accent/20 via-accent/5 to-transparent border border-accent/20 relative overflow-hidden group">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/5 to-transparent" />
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 rounded-lg bg-accent/20 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <Crown size={14} className="text-accent" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">
              VIP Active
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] text-main font-bold italic tracking-tight">
              {timeLeft}
            </p>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-accent w-2/3 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {user?.is_vip === 1 && isCollapsed && (
        <div className="mx-auto mb-4 p-2 rounded-full bg-accent/10 border border-accent/30 animate-pulse">
          <Crown size={16} className="text-accent" />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              relative flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 group
              ${isActive 
                ? 'bg-accent/10 text-accent font-black' 
                : 'text-dim hover:bg-surface-2 hover:text-main'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute -left-4 w-1.5 h-6 bg-accent rounded-r-full shadow-[4px_0_15px_rgba(212,175,55,0.6)]" />
                )}
                
                <item.icon 
                  size={20} 
                  strokeWidth={isActive || (item.isPremium && isVip) ? 2.5 : 1.5} 
                  className={`
                    transition-transform duration-300 group-hover:scale-110
                    ${isCollapsed ? 'mx-auto' : ''}
                    ${item.isPremium && !isVip ? 'text-accent animate-pulse' : ''}
                    ${item.isPremium && isVip ? 'text-accent drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' : ''}
                  `} 
                />

                {!isCollapsed && (
                  <span className={`
                    text-[10px] uppercase tracking-[0.3em] whitespace-nowrap transition-all
                    ${isActive ? 'italic' : 'font-medium'}
                  `}>
                    {item.label}
                  </span>
                )}
                
                {isCollapsed && (
                  <div className="absolute left-16 bg-surface-2 text-main px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 border border-border shadow-2xl z-50 -translate-x-2.5 group-hover:translate-x-0">
                    {item.label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border/50 bg-surface-2/30 backdrop-blur-md">  
        <ThemeToggle />

        <NavLink 
          to="/settings"
          className={({ isActive }) => `
            flex items-center gap-4 p-3.5 rounded-xl transition-all group
            ${isActive ? 'bg-accent text-black font-black' : 'text-dim hover:text-main hover:bg-surface-2'}
          `}
        >
          <Settings size={20} strokeWidth={1.5} className={`${isCollapsed ? 'mx-auto' : ''} group-hover:rotate-45 transition-transform duration-500`} />
          {!isCollapsed && (
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Settings</span>
          )}
        </NavLink>

        <div className={`
            flex items-center gap-4 p-3.5 rounded-xl transition-all group
             text-dim hover:text-main hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 active:scale-95 cursor-pointer
          `}
          onClick={logout}
        >
          <LogOut size={20} strokeWidth={1.5} className={`${isCollapsed ? 'mx-auto' : ''}`} />
          {!isCollapsed && (
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Logout</span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;