import { Home, Film, Tv, Clock, Heart, Settings, ChevronLeft, Search } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/browse' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Film, label: 'Movies', path: '/media/movie' },
    { icon: Tv, label: 'TV Shows', path: '/media/tv' },
    { icon: Clock, label: 'Recent', path: '/recent' },
    { icon: Heart, label: 'My List', path: '/mylist' },
  ];

  return (
    <aside className={`
      ${isCollapsed ? 'w-20' : 'w-64'} 
      transition-all duration-300 bg-surface-1 border-r border-border 
      flex flex-col h-screen sticky top-0 z-50 overflow-hidden
    `}>
      <div className="p-6 flex items-center justify-between min-h-20">
        {!isCollapsed && <div className="scale-90 origin-left"><Logo /></div>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 hover:bg-surface-2 rounded-sm text-dim hover:text-main transition-all active:scale-90"
        >
          <ChevronLeft size={20} className={`${isCollapsed ? 'rotate-180' : ''} transition-transform`} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              relative flex items-center gap-4 p-3 rounded-sm transition-all duration-300 group
              ${isActive 
                ? 'bg-accent/10 text-accent font-black italic' 
                : 'text-dim hover:bg-main/5 hover:text-main'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-accent rounded-r-full" />
                )}
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} className={`${isCollapsed ? 'mx-auto' : ''}`} />
                {!isCollapsed && (
                  <span className="text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">
                    {item.label}
                  </span>
                )}
                
                {isCollapsed && (
                  <div className="absolute left-16 bg-surface-2 text-main px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-border shadow-2xl z-100">
                    {item.label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 space-y-2 border-t border-border bg-app/50">
        <div className='w-full'>
          <ThemeToggle />
        </div>

        <NavLink 
          to="/settings"
          className={({ isActive }) => `
            flex items-center gap-4 p-3 rounded-sm transition-all
            ${isActive ? 'bg-main/10 text-main' : 'text-dim hover:text-main hover:bg-surface-2'}
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