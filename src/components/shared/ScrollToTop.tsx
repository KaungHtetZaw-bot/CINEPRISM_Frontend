import { useEffect, useState } from 'react';
import type{RefObject} from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  mainRef: RefObject<HTMLDivElement | null>;
}

const ScrollToTop = ({ mainRef }: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleScroll = () => {
      setIsVisible(mainElement.scrollTop > 500);
    };

    mainElement.addEventListener('scroll', handleScroll);
    return () => mainElement.removeEventListener('scroll', handleScroll);
  }, [mainRef]);

  const scrollToTop = () => {
    mainRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`absolute bottom-24 sm:bottom-8 right-8 z-70 
        p-4 bg-white/80 text-black rounded-full shadow-2xl
        transition-all duration-300 active:scale-90
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        hover:bg-cinema-gold
      `}
    >
      <ArrowUp size={20} strokeWidth={3} />
    </button>

    
  );
};

export default ScrollToTop;


{/* <button
            onClick={scrollToTop}
            className="absolute bottom-10 right-5 z-50 group flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 group-hover:text-cinema-gold transition-colors duration-300">
              Ascend
            </span>
            <div className="relative p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden transition-all duration-500 group-hover:border-cinema-gold group-hover:bg-white/10 group-active:scale-90 shadow-2xl">
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20 group-hover:border-cinema-gold" />
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20 group-hover:border-cinema-gold" />
              
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-5 h-5 text-white group-hover:text-cinema-gold transition-transform group-hover:-translate-y-1 duration-500"
                strokeWidth="2.5" 
                strokeLinecap="square"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
            <div className="w-px h-10 bg-linear-to-b from-white/20 to-transparent group-hover:from-cinema-gold group-hover:h-14 transition-all duration-500" />
          </button> */}