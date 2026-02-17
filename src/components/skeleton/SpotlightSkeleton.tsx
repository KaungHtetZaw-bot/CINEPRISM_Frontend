const SpotlightSkeleton = () => (
  <div className="relative h-[85vh] w-full bg-neutral-900 overflow-hidden animate-pulse">
    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 space-y-6 max-w-3xl">
      <div className="h-12 md:h-16 bg-white/30 rounded-lg w-3/4" />
      
      <div className="space-y-3">
        <div className="h-4 bg-white/15 rounded w-full" />
        <div className="h-4 bg-white/15 rounded w-full" />
        <div className="h-4 bg-white/15 rounded w-2/3" />
      </div>

      <div className="flex gap-4 pt-4">
        <div className="h-12 w-36 bg-white/30 rounded-md" />
        <div className="h-12 w-36 bg-white/30 rounded-md" />
      </div>
    </div>
    
    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
  </div>
);

export default SpotlightSkeleton;