import { Home, Film, Tv, Clock, ChevronLeft, Search, Crown, LayoutGrid, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import { isActiveNavItem } from './navActive';
import { useAuthStore } from '../../features/auth/store/useAuthStore';
import VipCard from '../../features/subscription/components/VipCard';

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const isVip = user?.is_vip;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/browse' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Film, label: 'Movies', path: '/media/movie' },
    { icon: Tv, label: 'TV Shows', path: '/media/tv' },
    { icon: LayoutGrid, label: 'Genres', path: '/media/genres/movie' },
    { icon: Clock, label: 'Recent', path: '/mylist/recent' },
    { icon: User, label: 'Profile', path: '/profile' },

  ];

  return (
    <aside className={`
      ${isCollapsed ? 'w-20' : 'w-64'} 
      transition-all duration-200 border-r border-border/50 
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

      {!isCollapsed && (
        <VipCard />
      )}

      {isCollapsed && (
        <div className="mx-auto mb-4 p-2 rounded-full bg-accent/10 border border-accent/30 animate-pulse">
          <Crown size={16} className="text-accent" />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive = isActiveNavItem(pathname, item);
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`
                relative flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 group
                ${isActive
                  ? 'bg-accent/10 text-accent font-black'
                  : 'text-dim hover:bg-surface-2 hover:text-main'}
              `}
            >
              {isActive && (
                <div className="absolute -left-4 w-1.5 h-6 bg-accent rounded-r-full shadow-[4px_0_15px_rgba(212,175,55,0.6)]" />
              )}

              <item.icon
                size={20}
                strokeWidth={isActive || (isVip) ? 2.5 : 1.5}
                className={`
                  transition-transform duration-300 group-hover:scale-110
                  ${isCollapsed ? 'mx-auto' : ''}
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
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50 bg-surface-2/30 backdrop-blur-md">
        <ThemeToggle />

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