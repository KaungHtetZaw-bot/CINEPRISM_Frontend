const MovieDetailSkeleton = () => {
  return (
    <div className="relative bg-app min-h-screen pb-24 overflow-hidden animate-pulse">
      {/* 1. Hero / Backdrop Area */}
      <div className="relative h-[80vh] w-full bg-skeleton/50">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-main/5 to-transparent" />
        
        {/* Theme-aware Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-app via-app/40 to-transparent" />

        {/* Action Button Skeletons (Top Right) */}
        <div className="absolute top-8 right-6 md:right-16 flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-11 w-11 rounded-full border border-main/5 bg-surface/50 backdrop-blur-md" />
          ))}
        </div>

        {/* Hero Content Skeletons */}
        <div className="absolute bottom-5 left-6 md:left-16 w-full max-w-5xl space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="h-3 bg-skeleton rounded-xs w-32" />
               <div className="h-px bg-main/10 w-12" />
               <div className="h-3 bg-skeleton rounded-xs w-16" />
            </div>
            
            <div className="space-y-4">
              <div className="h-14 md:h-18 bg-skeleton rounded-xs w-[75%]" />
              <div className="h-14 md:h-18 bg-skeleton rounded-xs w-[40%]" />
            </div>

            <div className="flex items-center gap-6">
              <div className="h-8 bg-skeleton rounded-xs w-24" />
              <div className="flex gap-2">
                <div className="h-6 bg-surface border border-main/5 rounded-full w-20" />
                <div className="h-6 bg-surface border border-main/5 rounded-full w-20" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-14 w-40 bg-main/20 rounded-sm shadow-2xl" />
            <div className="h-14 w-40 bg-surface border border-main/10 rounded-sm" />
          </div>
        </div>
      </div>

      {/* 2. Content Grid Area */}
      <div className="px-6 md:px-16 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-8 space-y-20">
          {/* Narrative / Overview */}
          <div className="space-y-6">
            <div className="h-2 bg-skeleton w-32" />
            <div className="space-y-4">
              <div className="h-5 bg-surface w-full rounded-xs" />
              <div className="h-5 bg-surface w-full rounded-xs" />
              <div className="h-5 bg-surface w-[90%] rounded-xs" />
              <div className="h-5 bg-surface w-[40%] rounded-xs" />
            </div>
          </div>

          {/* Cast Section */}
          <div className="space-y-10">
            <div className="flex justify-between items-end border-b border-main/5 pb-4">
                <div className="h-3 bg-skeleton w-32" />
                <div className="h-2 bg-surface w-20" />
            </div>
            <div className="flex gap-8 overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="shrink-0 space-y-4">
                  <div className="h-48 w-36 bg-surface rounded-sm border border-main/5" />
                  <div className="h-3 bg-skeleton w-28 rounded-xs" />
                  <div className="h-2 bg-surface w-20 rounded-xs" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Sidebar Skeleton */}
        <div className="lg:col-span-4 bg-surface p-10 rounded-sm border border-main/5 h-fit space-y-10">
          {[1, 2, 3].map((group) => (
            <div key={group} className="space-y-3">
               <div className="h-2 bg-skeleton w-12" />
               <div className="h-4 bg-skeleton w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;