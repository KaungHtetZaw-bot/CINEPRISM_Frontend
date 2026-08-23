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
        p-4 bg-surface-1 text-main rounded-full shadow-2xl
        transition-all duration-300 active:scale-90
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        hover:bg-accent hover:text-black
      `}
    >
      <ArrowUp size={20} strokeWidth={3} />
    </button>
  );
};

export default ScrollToTop;
