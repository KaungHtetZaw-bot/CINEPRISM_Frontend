import { Home, Film, Tv, Clock, Heart, Settings, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/browse' },
    { icon: Film, label: 'Movies', path: '/media/movie' },
    { icon: Tv, label: 'TV Shows', path: '/media/tv' },
    { icon: Clock, label: 'Recent', path: '/recent' },
    { icon: Heart, label: 'My List', path: '/mylist' },
  ];

  return (
    <aside className={`
      ${isCollapsed ? 'w-20' : 'w-64'} 
      transition-all duration-300 bg-sidebar border-r border-white/5 
      flex flex-col h-screen sticky top-0 z-50 overflow-hidden
    `}>
      {/* 1. HEADER: Branding & Toggle */}
      <div className="p-6 flex items-center justify-between min-h-20">
        {!isCollapsed && <div className="scale-90 origin-left"><Logo /></div>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 hover:bg-(--var--text-main) rounded-sm text-dim hover:text-main transition-all active:scale-90"
        >
          <ChevronLeft size={20} className={`${isCollapsed ? 'rotate-180' : ''} transition-transform`} />
        </button>
      </div>

      {/* 2. NAVIGATION: Menu Items */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              relative flex items-center gap-4 p-3 rounded-sm transition-all duration-300 group
              ${isActive 
                ? 'bg-cinema-gold/10 text-cinema-gold font-black italic' 
                : 'text-dim hover:bg-(--var--text-main/5) hover:text-main'}
            `}
          >
            {/* Active Indicator Line */}
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-cinema-gold rounded-r-full" />
                )}
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} className={`${isCollapsed ? 'mx-auto' : ''}`} />
                {!isCollapsed && (
                  <span className="text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip for Collapsed Mode - System Style */}
                {isCollapsed && (
                  <div className="absolute left-16 bg-zinc-800 text-white px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 shadow-2xl z-100">
                    {item.label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* 3. FOOTER: Theme & Settings */}
      <div className="p-4 space-y-2 border-t border-white/5 bg-black/10">
        <div className='w-full'>
          <ThemeToggle />
        </div>

        <NavLink 
          to="/settings"
          className={({ isActive }) => `
            flex items-center gap-4 p-3 rounded-sm transition-all
            ${isActive ? 'bg-white/10 text-main' : 'text-dim hover:text-main hover:bg-sidebar'}
          `}
        >
          <Settings size={20} strokeWidth={1.5} className={`${isCollapsed ? 'mx-auto' : ''}`} />
          {!isCollapsed && (
            <span className="text-[11px] uppercase tracking-[0.2em]">Settings</span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;