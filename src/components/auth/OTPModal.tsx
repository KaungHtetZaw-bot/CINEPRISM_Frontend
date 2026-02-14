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
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-transparent backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose} 
      />
      <div className="relative z-10 w-full max-w-md bg-app border border-white/10 p-8 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-dim hover:text-white">
          <X size={20} />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-black mb-2">Verify your email</h2>
          <p className="text-sm text-muted mb-6">
            Enter the 6-digit code we sent to <br/>
            <span className="text-white font-medium">{email}</span>
          </p>

          <div className='px-10'>
            <OTPInput onComplete={onVerify} />
          </div>

          <button className="w-full py-4 bg-cinema-gold text-black font-bold rounded-lg mt-4 uppercase tracking-wider text-sm">
            Confirm & Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;