const MovieSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 w-full group">
      <div className="relative aspect-2/3 md:mb-4 mb-2 w-full bg-skeleton rounded-lg overflow-hidden border border-input">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] 
          bg-linear-to-r from-transparent via-white/30 to-transparent" />
        {/* <div className="absolute top-2 right-2 h-4 w-8 bg-white/5 rounded-xs" /> */}
      </div>
      <div className="px-1 md:space-y-2 space-y-0">
        <div className="h-3 bg-skeleton w-1/2 rounded-xs opacity-100" />
        
        {/* <div className="flex justify-between items-center">
          <div className="h-2 bg-white/5 w-1/3 rounded-xs" />
          <div className="h-2 bg-white/5 w-4 rounded-xs" />
        </div> */}
      </div>
    </div>
  );
};

export default MovieSkeleton;