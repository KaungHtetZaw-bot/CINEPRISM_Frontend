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
    <header className="relative w-full h-20 z-50">
      <motion.nav 
        initial={false}
        animate={{
          position: isFixed ? "fixed" : "relative",
          top: isFixed ? "1rem" : "0rem",
          width: isFixed ? "92%" : "100%",
          left: isFixed ? "4%" : "0%",
          borderRadius: isFixed ? "12px" : "0px",
          backgroundColor: isFixed ? "rgba(10, 10, 10, 0.8)" : "rgba(18, 18, 18, 0.9)",
          paddingLeft: isFixed ? "1.5rem" : "2rem",
          paddingRight: isFixed ? "1.5rem" : "2rem",
          backdropFilter: isFixed ? "blur(20px)" : "blur(12px)",
          border: isFixed ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0)",
          boxShadow: isFixed ? "0 20px 40px rgba(0,0,0,0.4)" : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="flex justify-between items-center py-4 overflow-hidden"
      >
        <div className="scale-90 origin-left">
          <Logo />
        </div>

        <div className="flex items-center gap-4">
          <Link to={'/vip'} className="flex flex-col items-center">
            <Crown/>
            <span className="text-md font-mono text-zinc-500 tabular-nums uppercase">30 days</span>
          </Link>
          <ThemeToggle/>
        </div>
      </motion.nav>
    </header>
  );
};

export default MobileHeader;