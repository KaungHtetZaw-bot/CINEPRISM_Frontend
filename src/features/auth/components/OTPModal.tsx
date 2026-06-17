import React from 'react';
import { X } from 'lucide-react';
import OTPInput from './OTPInput';

interface OTPModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, email, onClose, onVerify }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 inset-0 z-200 flex items-end md:items-center justify-center p-0 md:p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md bg-surface-1 border-t md:border border-border 
                      p-8 md:rounded-3xl rounded-t-[2.5rem] shadow-2xl 
                      animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300">
        
        {/* Mobile Drag Handle Indicator */}
        <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6 md:hidden" />

        <button onClick={onClose} className="absolute top-6 right-6 text-muted hover:text-main p-2">
          <X size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-heading font-black uppercase italic tracking-tighter mb-2 text-main">
            Verify <span className="text-accent">Identity</span>
          </h2>
          <p className="text-[11px] text-dim uppercase tracking-widest leading-relaxed mb-6">
            Enter the 6-digit code sent to <br/>
            <span className="text-main font-bold lowercase tracking-normal">{email}</span>
          </p>

          <div className='px-2 md:px-4'>
            <OTPInput onComplete={onVerify} />
          </div>

          <div className="space-y-4">
            {/* <button 
              onClick={() => {}}
              className="w-full py-5 bg-accent text-black font-black uppercase tracking-widest rounded-2xl 
                       hover:brightness-110 transition-all active:scale-[0.98] shadow-xl shadow-accent/10"
            >
              Confirm & Finish
            </button> */}
            
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
              Didn't receive code? <button className="text-accent hover:underline">Resend</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;