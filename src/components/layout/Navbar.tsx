import React from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar px-6 py-4 flex justify-between items-center bg-app/80 sticky top-0 z-50 backdrop-blur-xl border-b border-glass-border">
      <Logo />
      
      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-10">
        <div className="w-full relative group">
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="
              w-full py-2 px-10 rounded-full 
              bg-input-bg text-main 
              border border-input-border
              transition-all outline-none 
              focus:ring-2 focus:ring-cinema-gold/20 focus:border-cinema-gold
              placeholder:text-muted/60
            "
          />
          <span className="absolute left-4 top-2.5">
            <Search size={18} className="text-muted group-focus-within:text-cinema-gold transition-colors" />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="hidden sm:block text-muted hover:text-main transition-colors font-semibold text-sm">
          Sign In
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;