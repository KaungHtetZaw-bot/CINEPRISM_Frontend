import { Home, Film, Tv, Clock, Heart, Settings, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Film, label: 'Movies', active: false },
    { icon: Tv, label: 'TV Shows', active: false },
    { icon: Clock, label: 'Recent', active: false },
    { icon: Heart, label: 'My List', active: false },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-surface border-r border-white/5 flex flex-col h-screen sticky top-0`}>
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && <Logo />}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-white/10 rounded-lg">
          <ChevronLeft className={`${isCollapsed ? 'rotate-180' : ''} transition-transform`} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button key={item.label} className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors ${item.active ? 'bg-cinema-gold text-black font-bold' : 'text-dim hover:bg-white/5 hover:text-white'}`}>
            <item.icon size={24} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center gap-4 p-3 text-dim hover:text-white transition-colors">
          <Settings size={24} />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;