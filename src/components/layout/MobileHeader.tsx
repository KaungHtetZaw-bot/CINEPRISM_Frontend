import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import Logo from './Logo';


// Inside MainLayout.tsx or a new MobileHeader.tsx
const MobileHeader = () => {
  const { user } = useAuthStore();

  return (
    <div className="sm:hidden flex items-center justify-between sticky top-0 z-50 px-6 py-4 bg-app/80 backdrop-blur-md border-b border-white/5">
      <Logo />
      
      <div className="flex items-center gap-4">
        <Link 
          to="/vip" 
          className="bg-linear-to-r from-cinema-gold to-yellow-600 px-3 py-1 rounded-full text-[10px] font-black text-black uppercase tracking-tighter"
        >
          VIP
        </Link>
        
        <Link to="/profile">
          <div className="w-8 h-8 rounded-full border border-cinema-gold/30 bg-white/5 flex items-center justify-center text-xs font-bold text-cinema-gold">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader