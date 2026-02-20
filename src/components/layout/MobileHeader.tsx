import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const MobileHeader = () => {
  const { user } = useAuthStore();

  return (
    <div className="sm:hidden flex items-center justify-between sticky top-0 z-50 px-6 py-4 bg-app/60 backdrop-blur-2xl border-b border-white/5">
      <div className="scale-90 origin-left">
        <Logo />
      </div>
      
      <div className="flex items-center gap-5">
        <Link 
          to="/vip" 
          className="relative group flex items-center gap-1.5"
        >
          <span className="w-1 h-1 rounded-full bg-cinema-gold animate-pulse" />
          <span className="text-[10px] font-black text-cinema-gold uppercase tracking-[0.2em] italic">
            Member
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-px bg-cinema-gold transition-all duration-500 group-hover:w-full" />
        </Link>
        
        <Link to="/profile" className="relative">
          <div className="w-9 h-9 rounded-sm border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden transition-all active:scale-95 group">
             <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-cinema-gold/40" />
             <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-cinema-gold/40" />

             <span className="text-xs font-black text-zinc-300 group-hover:text-cinema-gold transition-colors">
               {user?.name?.charAt(0).toUpperCase() || 'U'}
             </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;