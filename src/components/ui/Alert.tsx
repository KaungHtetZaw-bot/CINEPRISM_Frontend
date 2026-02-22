import { useEffect } from 'react';
import { X, AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface AlertProps {
  message: string;
  type?: 'error' | 'success' | 'info';
  onClose: () => void;
}

const Alert = ({ message, type = 'error', onClose }: AlertProps) => {
  const duration = 5000;

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    error: {
      styles: "border-red-900/50 bg-black/80 text-red-400",
      bar: "bg-red-600",
      icon: <AlertCircle size={14} />,
      label: "System Error"
    },
    success: {
      styles: "border-emerald-900/50 bg-black/80 text-emerald-400",
      bar: "bg-emerald-600",
      icon: <CheckCircle2 size={14} />,
      label: "Success"
    },
    info: {
      styles: "border-cinema-gold/30 bg-black/80 text-cinema-gold",
      bar: "bg-cinema-gold",
      icon: <Info size={14} />,
      label: "Update"
    },
  };

  return (
    <div className={`fixed top-0 right-6 md:right-10 z-200 w-full max-w-[320px] 
                    border backdrop-blur-2xl shadow-2xl overflow-hidden rounded-sm
                    animate-in fade-in slide-in-from-bottom-5 duration-500 ${config[type].styles}`}>
      
      {/* 1. TOP LABEL AREA */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/2">
        <div className="flex items-center gap-2">
          {config[type].icon}
          <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-70">
            {config[type].label}
          </span>
        </div>
        <button onClick={onClose} className="opacity-40 hover:opacity-100 transition-opacity">
          <X size={12} />
        </button>
      </div>

      {/* 2. MESSAGE AREA */}
      <div className="px-4 py-4">
        <p className="text-[11px] font-bold uppercase tracking-wider leading-relaxed italic">
          {message}
        </p>
      </div>

      {/* 3. THE SCANNER BAR (TIMER) */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/5">
        <div 
          className={`h-full ${config[type].bar} transition-all ease-linear`}
          style={{ 
            animation: `shrinkWidth ${duration}ms linear forwards` 
          }}
        />
      </div>

      {/* Internal CSS for the bar animation */}
      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Alert;