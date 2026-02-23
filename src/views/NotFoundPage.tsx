import { Link } from 'react-router-dom';
import { ChevronLeft, Terminal } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-app flex flex-col items-center justify-center p-6 text-center">
      {/* 1. Background Decor (Large Ghost Text) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[30vw] font-black text-main/2 italic leading-none select-none">
          LOST
        </span>
      </div>

      <div className="relative z-10 space-y-8 max-w-md">
        {/* 2. The Header: Technical Error Code */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-cinema-gold/10 border border-cinema-gold/20 rounded-sm mb-6">
            <Terminal size={12} className="text-cinema-gold" />
            <span className="text-[10px] font-black text-cinema-gold uppercase tracking-[0.3em]">
              System Error 404
            </span>
          </div>
          
          <h1 className="text-8xl font-black italic tracking-tighter text-main">
            VOID
          </h1>
          <p className="mt-4 text-main/50 text-xs font-medium leading-relaxed uppercase tracking-widset">
            The resource you are attempting to access has been <br /> 
            <span className="text-main/20">declassified or moved</span> to another sector.
          </p>
        </div>

        {/* 3. The Action: Sharp Button */}
        <div className="flex flex-col items-center gap-6">
          <Link 
            to="/browse" 
            className="group flex items-center gap-3 px-8 py-4 bg-app text-main rounded-sm font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-cinema-gold  hover:text-white active:scale-95 shadow-2xl"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Return to Base
          </Link>

          {/* Decorative Technical ID */}
          <div className="flex items-center gap-4 opacity-30">
            <div className="h-px w-8 bg-main" />
            <span className="text-[9px] font-mono text-main uppercase">
              Ref: {Math.random().toString(36).substring(7).toUpperCase()}
            </span>
            <div className="h-px w-8 bg-main" />
          </div>
        </div>
      </div>

      {/* 4. The Corner Aesthetic (Obsidian Signature) */}
      <div className="fixed bottom-10 left-10 text-[10px] font-black text-zinc-800 uppercase vertical-text tracking-[0.5em] hidden md:block">
        Catalog / Offline
      </div>
    </div>
  );
};

export default NotFoundPage;