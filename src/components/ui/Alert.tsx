import { useEffect } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AlertProps {
  message: string;
  type?: 'error' | 'success' | 'info';
  onClose: () => void;
}

const Alert = ({ message, type = 'error', onClose }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-close after 5s
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    error: "border-red-500/50 bg-red-500/10 text-red-200",
    success: "border-emerald-500/50 bg-emerald-500/10 text-emerald-200",
    info: "border-cinema-gold/50 bg-cinema-gold/10 text-cinema-gold/20",
  };

  return (
    <div className={`fixed bottom-10 right-10 z-100 flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md animate-in fade-in slide-in-from-right-5 ${styles[type]}`}>
      {type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
};

export default Alert;