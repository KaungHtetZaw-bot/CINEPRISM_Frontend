const Logo = () => {
  return (
    <div className="group flex items-center gap-2 cursor-pointer">
      <div className="w-8 h-8 bg-linear-to-br from-accent to-accent-soft rounded-lg flex items-center justify-center shadow-[0_0_15px_var(--shadow-color)] group-hover:shadow-accent/50 transition-all duration-500">
        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-10 border-l-black border-b-[6px] border-b-transparent ml-1" />
      </div>
      
      <div className="md:block hidden text-xl md:text-2xl font-black tracking-tight leading-none">
        <span className="text-muted group-hover:text-main transition-colors">CINE</span>
        <span className="bg-linear-to-r from-accent to-accent-soft bg-clip-text text-transparent">
          PRISM
        </span>
      </div>
    </div>
  );
};

export default Logo;