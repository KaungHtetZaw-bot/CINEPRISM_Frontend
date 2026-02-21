import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)}
      className="group absolute top-8 left-6 md:left-12 z-50 flex items-center gap-2 transition-all"
    >
      <div className="flex items-center justify-center w-10 h-10 bg-black/10 backdrop-blur-md border border-white/10 rounded-full group-hover:border-cinema-gold group-hover:bg-white/5 transition-all">
        <ChevronLeft size={24} className="text-zinc-200 group-hover:text-cinema-gold transition-transform group-hover:-translate-x-0.5" />
      </div>

      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Back
      </span>
    </button>
  );
};

export default BackButton;