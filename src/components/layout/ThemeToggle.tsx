import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newIsDark = !root.classList.contains('dark');
    
    if (newIsDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    setIsDark(newIsDark);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="
        p-2.5 rounded-xl
        text-main hover:text-cinema-gold
        transition-all duration-300
        hover:scale-110 active:scale-95
        flex items-center justify-center
        bg-main/10 hover:bg-main/20 active:bg-main/30
        shadow-md shadow-black/20
      "
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun size={20} strokeWidth={2.5} color='yellow' />
      ) : (
        <Moon size={20} strokeWidth={2.5} color='white' />
      )}
    </button>
  );
};

export default ThemeToggle;