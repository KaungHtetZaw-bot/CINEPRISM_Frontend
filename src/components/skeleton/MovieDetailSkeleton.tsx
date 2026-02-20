const MovieDetailSkeleton = () => {
  return (
    <div className="relative animate-pulse bg-app min-h-screen pb-24">
      {/* 1. HERO CANVAS SKELETON */}
      <div className="relative h-[80vh] w-full bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-app via-app/20 to-transparent" />
        
        {/* Floating Action Buttons (Top Right) */}
        <div className="absolute top-8 right-6 md:right-16 flex gap-3">
          <div className="h-11 w-11 rounded-full bg-white/10" />
          <div className="h-11 w-11 rounded-full bg-white/10" />
          <div className="h-11 w-11 rounded-full bg-white/10" />
        </div>

        {/* Bottom Left Info */}
        <div className="absolute bottom-12 left-6 md:left-16 w-full max-w-5xl space-y-8">
          <div className="space-y-4">
            {/* Type & Year tag */}
            <div className="h-4 bg-white/10 rounded-sm w-48" />
            
            {/* Massive Title Block */}
            <div className="space-y-3">
              <div className="h-16 md:h-24 bg-white/10 rounded-sm w-3/4" />
              <div className="h-16 md:h-24 bg-white/10 rounded-sm w-1/2" />
            </div>

            {/* Rating & Genre Chips */}
            <div className="flex items-center gap-6">
              <div className="h-8 bg-white/10 rounded-sm w-32" />
              <div className="flex gap-2">
                <div className="h-6 bg-white/5 rounded-full w-16" />
                <div className="h-6 bg-white/5 rounded-full w-16" />
              </div>
            </div>
          </div>

          {/* Main Action Button */}
          <div className="h-16 w-56 bg-white/20 rounded-sm" />
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID SKELETON */}
      <div className="px-6 md:px-16 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Narrative & Cast */}
        <div className="lg:col-span-8 space-y-16">
          <div className="space-y-6">
            <div className="h-3 bg-white/10 w-40 rounded-sm" />
            <div className="space-y-3">
              <div className="h-6 bg-white/5 w-full rounded-sm" />
              <div className="h-6 bg-white/5 w-full rounded-sm" />
              <div className="h-6 bg-white/5 w-3/4 rounded-sm" />
            </div>
          </div>

          {/* Personnel Row */}
          <div className="space-y-8">
            <div className="h-4 bg-white/10 w-48 rounded-sm" />
            <div className="flex gap-8 overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="shrink-0 space-y-4">
                  <div className="h-48 w-36 bg-white/5 rounded-sm" />
                  <div className="h-3 bg-white/10 w-24 rounded-sm" />
                  <div className="h-2 bg-white/5 w-16 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Technical Sidebar */}
        <div className="lg:col-span-4 bg-white/5 p-10 rounded-sm border border-white/5 h-80 space-y-10">
          <div className="space-y-3">
            <div className="h-2 bg-white/10 w-16" />
            <div className="h-6 bg-white/10 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3"><div className="h-2 bg-white/10 w-12" /><div className="h-4 bg-white/10 w-full" /></div>
            <div className="space-y-3"><div className="h-2 bg-white/10 w-12" /><div className="h-4 bg-white/10 w-full" /></div>
          </div>
          <div className="space-y-3">
            <div className="h-2 bg-white/10 w-20" />
            <div className="h-4 bg-white/10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;