import { useNavigate,useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = ()=> {
    const from = location?.state?.from;
    navigate(from || '/browse', { replace: true });
  };

  return (
    <button 
      onClick={()=>handleBack()}
      className="group absolute top-8 left-6 md:left-12 z-50 flex items-center gap-2 transition-all"
    >
      <div className="flex items-center justify-center w-10 h-10 bg-app/20 backdrop-blur-md border border-border rounded-full group-hover:border-accent group-hover:bg-surface-2 transition-all">
        <ChevronLeft size={24} className="text-dim group-hover:text-accent transition-transform group-hover:-translate-x-0.5" />
      </div>
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted group-hover:text-main opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Back
      </span>
    </button>
  );
};

export default BackButton;