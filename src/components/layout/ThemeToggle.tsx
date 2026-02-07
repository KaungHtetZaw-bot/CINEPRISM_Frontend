import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'; // Import the actual components

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initial check on load
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
      "
      aria-label="Toggle Theme"
    >
      {/* Lucide icons are cleaner and respond to CSS colors */}
      {isDark ? (
        <Sun size={20} strokeWidth={2.5} />
      ) : (
        <Moon size={20} strokeWidth={2.5} />
      )}
    </button>
  );
};

export default ThemeToggle;