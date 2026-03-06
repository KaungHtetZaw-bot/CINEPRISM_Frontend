const MovieDetailSkeleton = () => {
  return (
    <div className="relative bg-app min-h-screen pb-24 overflow-hidden">
      {/* 1. Hero / Backdrop Area - Height matches the real page */}
      <div className="relative h-[70vh] md:h-[80vh] w-full bg-skeleton/30 animate-pulse">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-main/5 to-transparent" />
        
        {/* Theme-aware Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-app via-app/60 to-transparent" />

        {/* Action Button Skeletons (Top Right) */}
        <div className="absolute top-6 right-4 md:top-8 md:right-16 flex gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-border bg-surface-1/50 backdrop-blur-md" />
          ))}
        </div>

        {/* Hero Content Skeletons */}
        <div className="absolute bottom-8 left-6 md:left-16 w-[calc(100%-3rem)] md:w-full max-w-5xl space-y-6 md:space-y-8 z-10">
          <div className="space-y-4 md:space-y-6">
            {/* Type & Year Label */}
            <div className="flex items-center gap-4">
               <div className="h-2.5 bg-skeleton/50 rounded-xs w-24 md:w-32" />
               <div className="h-px bg-border/50 w-8 md:w-12" />
               <div className="h-2.5 bg-skeleton/50 rounded-xs w-12 md:w-16" />
            </div>
            
            {/* Massive Title Skeleton */}
            <div className="space-y-3">
              <div className="h-10 md:h-20 bg-skeleton/60 rounded-xs w-[85%] md:w-[75%]" />
              <div className="h-10 md:h-20 bg-skeleton/60 rounded-xs w-[50%] md:w-[40%]" />
            </div>

            {/* Rating & Genres */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="h-6 md:h-8 bg-skeleton/50 rounded-xs w-20 md:w-24" />
              <div className="hidden md:block h-4 w-px bg-border/50" />
              <div className="flex gap-2">
                <div className="h-5 md:h-6 bg-surface-1 border border-border rounded-full w-16 md:w-20" />
                <div className="h-5 md:h-6 bg-surface-1 border border-border rounded-full w-16 md:w-20" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 md:gap-4">
            <div className="h-12 md:h-14 flex-1 md:flex-none md:w-40 bg-accent/10 rounded-sm border border-accent/20" />
            <div className="h-12 md:h-14 flex-1 md:flex-none md:w-40 bg-surface-1/50 border border-border rounded-sm" />
          </div>
        </div>
      </div>

      {/* 2. Content Grid Area */}
      <div className="px-6 md:px-16 mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        
        {/* Main Narrative Section */}
        <div className="lg:col-span-8 space-y-12 md:space-y-20 animate-pulse">
          <div className="space-y-4 md:space-y-6">
            <div className="h-2 bg-skeleton/40 w-28 md:w-32" />
            <div className="space-y-3">
              <div className="h-4 md:h-6 bg-surface-1/60 w-full rounded-xs" />
              <div className="h-4 md:h-6 bg-surface-1/60 w-full rounded-xs" />
              <div className="h-4 md:h-6 bg-surface-1/60 w-[95%] rounded-xs" />
              <div className="h-4 md:h-6 bg-surface-1/60 w-[40%] rounded-xs" />
            </div>
          </div>

          {/* Cast Section */}
          <div className="space-y-6 md:space-y-10">
            <div className="flex justify-between items-end border-b border-border/50 pb-4">
                <div className="h-2.5 bg-skeleton/40 w-32" />
            </div>
            <div className="flex gap-4 md:gap-8 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="shrink-0 space-y-4 w-28 md:w-36">
                  <div className="aspect-3/4 bg-surface-1/60 rounded-sm border border-border/50" />
                  <div className="h-2.5 bg-skeleton/40 w-full rounded-xs" />
                  <div className="h-2 bg-surface-1/60 w-3/4 rounded-xs" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Sidebar Skeleton (Stacks on Mobile) */}
        <div className="lg:col-span-4 bg-surface-1/30 p-6 md:p-10 rounded-sm border border-border/50 h-fit space-y-8 md:space-y-10 animate-pulse">
          {[1, 2, 3].map((group) => (
            <div key={group} className="space-y-3">
               <div className="h-1.5 bg-skeleton/30 w-10 md:w-12" />
               <div className="h-3.5 bg-skeleton/30 w-3/4 md:w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;