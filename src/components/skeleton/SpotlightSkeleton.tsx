const SpotlightSkeleton = () => (
  <div className="relative md:h-[85vh] h-[50vh] w-full bg-app overflow-hidden animate-pulse">
    {/* Background Shimmer Layer */}
    <div className="absolute inset-0 bg-skeleton/20" />
    
    {/* Theme-aware Cinematic Overlays */}
    <div className="absolute inset-0 bg-linear-to-t from-app via-app/60 to-transparent z-10" />
    <div className="absolute inset-0 bg-linear-to-r from-app via-transparent to-transparent z-10" />

    {/* Content Area Skeletons */}
    <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 space-y-8 max-w-4xl z-20">
      
      {/* Accent Line + Mini Label */}
      {/* <div className="flex items-center gap-3">
        <div className="w-8 h-px bg-main/10" />
        <div className="h-3 bg-skeleton rounded-xs w-24" />
      </div> */}

      {/* Title Skeletons - Large and bold-looking */}
      <div className="space-y-3">
        <div className="h-10 md:h-16 bg-skeleton rounded-sm w-3/4" />
        <div className="h-10 md:h-16 bg-skeleton rounded-sm w-1/2 md:hidden" />
      </div>
      
      {/* Overview/Description Skeletons */}
      <div className="space-y-3 pt-2">
        <div className="h-4 bg-surface rounded-xs w-full" />
        <div className="h-4 bg-surface rounded-xs w-[90%]" />
      </div>

      {/* Button Skeletons */}
      <div className="flex gap-4 pt-6">
        {/* Primary Button Placeholder */}
        <div className="h-14 w-40 bg-main/10 rounded-sm" />
        {/* Secondary Button Placeholder */}
        <div className="h-14 w-40 bg-surface border border-main/5 rounded-sm" />
      </div>
    </div>
  </div>
);

export default SpotlightSkeleton;