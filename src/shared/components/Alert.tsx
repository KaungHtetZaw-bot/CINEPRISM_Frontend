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
      styles: "border-red-900/50 bg-black/90 text-red-400",
      bar: "bg-red-600",
      icon: <AlertCircle size={14} />,
      label: "System Error"
    },
    success: {
      styles: "border-emerald-900/50 bg-black/90 text-emerald-400",
      bar: "bg-emerald-600",
      icon: <CheckCircle2 size={14} />,
      label: "Success"
    },
    info: {
      styles: "border-accent/30 bg-black/90 text-accent",
      bar: "bg-accent",
      icon: <Info size={14} />,
      label: "Update"
    },
  };

  return (
    /* Responsive positioning: 
       - Mobile: Centered at top with padding (left-1/2 -translate-x-1/2)
       - Desktop: Fixed to right-10
    */
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 
                    z-9999 w-[90%] max-w-85 
                    border backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.7)] 
                    overflow-hidden rounded-lg
                    animate-in fade-in slide-in-from-top-4 duration-500 ${config[type].styles}`}>
      
      {/* 1. TOP LABEL AREA */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          {config[type].icon}
          <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80">
            {config[type].label}
          </span>
        </div>
        <button 
          onClick={onClose} 
          className="p-1 -mr-1 opacity-50 hover:opacity-100 transition-opacity active:scale-90"
        >
          <X size={14} />
        </button>
      </div>

      {/* 2. MESSAGE AREA */}
      <div className="px-5 py-5">
        <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider leading-relaxed italic">
          {message}
        </p>
      </div>

      {/* 3. THE SCANNER BAR (TIMER) */}
      <div className="absolute bottom-0 left-0 h-0.75 w-full bg-white/5">
        <div 
          className={`h-full ${config[type].bar} transition-all ease-linear shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
          style={{ 
            animation: `shrinkWidth ${duration}ms linear forwards` 
          }}
        />
      </div>

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