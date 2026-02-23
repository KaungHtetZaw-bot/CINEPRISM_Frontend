import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  showLabel?: boolean;
}

const ThemeToggle = ({ showLabel = true }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className={`
        relative flex items-center transition-all duration-300
        hover:bg-main/5 active:scale-[0.97] group
       hover:border-cinema-gold/30 rounded-sm
        ${showLabel ? 'p-3 gap-3 w-full' : 'w-10 h-10 justify-center'}
      `}
      aria-label="Toggle Theme"
    >
      <div className="absolute top-0 right-0 w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="shrink-0">
        {isDark ? (
          <Sun 
            size={18} 
            strokeWidth={1.5} 
            className="text-cinema-gold drop-shadow-[0_0_8px_rgba(226,182,22,0.4)]" 
          />
        ) : (
          <Moon 
            size={18} 
            strokeWidth={1.5} 
            className="text-dim group-hover:text-main transition-colors" 
          />
        )}
      </div>

      {showLabel && (
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-dim group-hover:text-main transition-colors whitespace-nowrap">
          {isDark ? 'dark Mode' : 'light Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;