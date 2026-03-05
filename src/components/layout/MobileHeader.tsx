import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileHeader = () => {
  const { user } = useAuthStore();
  const { scrollY } = useScroll();
  const [isFixed, setIsFixed] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsFixed(latest > 80);
  });

  return (
    <header className="relative sm:hidden w-full z-50">
      <motion.nav
        initial={false}
        animate={{
          position: isFixed ? "fixed" : "relative",
          top: isFixed ? "1rem" : "0rem",
          width: isFixed ? "92%" : "100%",
          left: isFixed ? "4%" : "0%",       
          backgroundColor: isFixed
            ? "color-mix(in srgb, var(--bg-surface-2), transparent 10%)"
            : "color-mix(in srgb, var(--bg-app), transparent 5%)",
            
          paddingLeft: isFixed ? "1rem" : "1.2rem",
          paddingRight: isFixed ? "1rem" : "1.2rem",
          backdropFilter: isFixed ? "blur(20px)" : "blur(0px)",
          
          border: isFixed
            ? "1px solid var(--border-subtle)"
            : "1px solid transparent",
            
          boxShadow: isFixed
            ? "0 20px 40px var(--shadow-color)"
            : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="flex justify-between items-center py-2 overflow-hidden rounded-full"
      >
        <div className="scale-90 origin-left">
          <Logo />
        </div>

        <div className="flex items-center gap-6">
          <Link to={'/vip-purchase'} className="flex items-center gap-2 group">
            <div className="relative">
              <Crown size={18} className="text-accent group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-accent blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-[10px] font-black text-accent uppercase tracking-tighter italic">Premium</span>
              <span className="text-[9px] font-bold text-muted tabular-nums uppercase">30D LEFT</span>
            </div>
          </Link>
          
          <ThemeToggle showLabel={false} />
        </div>
      </motion.nav>
    </header>
  );
};

export default MobileHeader;