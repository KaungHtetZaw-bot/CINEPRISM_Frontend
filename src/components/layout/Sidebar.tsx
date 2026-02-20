import { Home, Film, Tv, Clock, Heart, Settings, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/browse' },
    { icon: Film, label: 'Movies', path: '/movies' },
    { icon: Tv, label: 'TV Shows', path: '/tv-shows' },
    { icon: Clock, label: 'Recent', path: '/recent' },
    { icon: Heart, label: 'My List', path: '/mylist' },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-surface border-r border-white/5 flex flex-col h-screen sticky top-0 z-50`}>
      {/* Header */}
      <div className="p-6 flex items-center justify-between min-h-20">
        {!isCollapsed && <Logo />}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 hover:bg-white/10 rounded-lg text-dim hover:text-white transition-colors"
        >
          <ChevronLeft className={`${isCollapsed ? 'rotate-180' : ''} transition-transform`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-cinema-gold text-black font-bold shadow-lg shadow-cinema-gold/20' 
                : 'text-dim hover:bg-white/5 hover:text-white'}
            `}
          >
            <item.icon size={24} className={`${isCollapsed ? 'mx-auto' : ''}`} />
            {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
            
            {/* Tooltip for Collapsed Mode */}
            {isCollapsed && (
              <div className="absolute left-20 bg-white text-black px-2 py-1 rounded md text-xs font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Settings */}
      <div className="p-4 border-t border-white/5">
        <NavLink 
          to="/settings"
          className={({ isActive }) => `
            flex items-center gap-4 p-3 rounded-xl transition-colors
            ${isActive ? 'text-white bg-white/10' : 'text-dim hover:text-white'}
          `}
        >
          <Settings size={24} className={`${isCollapsed ? 'mx-auto' : ''}`} />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;