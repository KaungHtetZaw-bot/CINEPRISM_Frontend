const MovieSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 w-full group">
      <div className="relative aspect-2/3 md:mb-4 mb-2 w-full bg-skeleton rounded-lg overflow-hidden border border-border">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] 
          bg-linear-to-r from-transparent via-main/20 to-transparent" />
      </div>
      <div className="px-1 md:space-y-2 space-y-0">
        <div className="h-3 bg-skeleton w-1/2 rounded-xs opacity-100" />
      </div>
    </div>
  );
};

export default MovieSkeleton;