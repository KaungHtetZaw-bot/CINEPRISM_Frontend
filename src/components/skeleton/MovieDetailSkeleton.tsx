const MovieDetailSkeleton = () => {
  return (
    <div className="relative animate-pulse bg-app min-h-screen">
      <div className="relative h-[80vh] w-full bg-white/5">
        <div className="absolute inset-0 bg-linear-to-t from-app via-app/40 to-transparent" />
        
        <div className="absolute bottom-20 left-6 md:left-16 right-6 space-y-6">
          <div className="h-16 md:h-24 bg-white/10 rounded-2xl w-3/4" />
        
          <div className="flex gap-6">
            <div className="h-6 bg-white/10 rounded-md w-20" />
            <div className="h-6 bg-white/10 rounded-md w-20" />
          </div>

          <div className="space-y-3 max-w-2xl">
            <div className="h-4 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-2/3" />
          </div>

          <div className="flex gap-4">
            <div className="h-14 w-40 bg-white/10 rounded-full" />
            <div className="h-14 w-40 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Info Grid Skeleton */}
      <div className="px-6 md:px-16">
        <div className="max-w-md space-y-4">
          <div className="h-4 bg-white/10 w-32 rounded" />
          <div className="space-y-4">
            <div className="h-8 bg-white/5 w-full rounded" />
            <div className="h-8 bg-white/5 w-full rounded" />
            <div className="h-8 bg-white/5 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;