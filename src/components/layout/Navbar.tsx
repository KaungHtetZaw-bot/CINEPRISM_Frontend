import { motion, useScroll, useTransform } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 200],
    ["rgba(var(--bg-app-rgb), 0)", "rgba(var(--bg-surface-1-rgb), 0.8)"]
  );

  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(8px)"]
  );
  const paddingTop = useTransform(scrollY, [0, 100], ["1.5rem", "1rem"]);
  const paddingBottom = useTransform(scrollY, [0, 100], ["1.5rem", "1rem"]);

  return (
    <motion.nav 
      style={{ 
        backgroundColor, 
        paddingTop, 
        paddingBottom,
        backdropFilter
      }}
      className="fixed top-0 w-full flex justify-between items-center md:px-25 px-8 z-50 border-b border-transparent transition-colors duration-300"
    >
      <Logo />  

      <div className="flex items-center gap-8">
        <button className="bg-main text-app px-5 py-2 rounded-full font-bold text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
          JOIN NOW
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;