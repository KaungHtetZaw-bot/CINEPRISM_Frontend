const Logo = () => {
  return (
    <div className="group flex items-center gap-2 cursor-pointer">
      <div className="w-8 h-8 bg-linear-to-br from-cinema-gold to-amber-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(226,182,22,0.3)] group-hover:shadow-cinema-gold/50 transition-all duration-500">
        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-10 border-l-black border-b-[6px] border-b-transparent ml-1" />
      </div>
      
      <div className="md:block hidden text-xl md:text-2xl font-black tracking-tight leading-none">
        <span className="text-muted group-hover:text-cinema-gold transition-colors">CINE</span>
        <span className="bg-linear-to-r from-cinema-gold to-amber-500 bg-clip-text text-transparent">
          PRISM
        </span>
      </div>
    </div>
  );
};

export default Logo;