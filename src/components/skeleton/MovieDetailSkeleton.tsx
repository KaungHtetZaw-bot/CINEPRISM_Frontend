const MovieDetailSkeleton = () => {
  return (
    <div className="relative bg-app min-h-screen pb-24 overflow-hidden">
      <div className="relative h-[80vh] w-full bg-white/2">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/3 to-transparent" />
        
        <div className="absolute inset-0 bg-linear-to-t from-app via-app/40 to-transparent" />
        <div className="h-100 relative">

        </div>
        <div className="absolute top-8 right-6 md:right-16 flex gap-3 h-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-11 w-11 rounded-sm border border-white/5 bg-white/5 backdrop-blur-md" />
          ))}
        </div>

        <div className="absolute bottom-5 left-6 md:left-16 w-full max-w-5xl space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="h-3 bg-white/10 rounded-xs w-32" />
               <div className="h-px bg-white/10 w-12" />
               <div className="h-3 bg-white/10 rounded-xs w-16" />
            </div>
            
            <div className="space-y-4">
              <div className="h-16 md:h-20 bg-white/10 rounded-xs w-[85%]" />
              <div className="h-16 md:h-20 bg-white/10 rounded-xs w-[50%]" />
            </div>

            <div className="flex items-center gap-6">
              <div className="h-8 bg-white/10 rounded-xs w-24" />
              <div className="flex gap-2">
                <div className="h-6 bg-white/5 border border-white/5 rounded-xs w-20" />
                <div className="h-6 bg-white/5 border border-white/5 rounded-xs w-20" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-14 w-40 bg-white/20 rounded-xs shadow-2xl" />
            <div className="h-14 w-40 bg-white/5 border border-white/10 rounded-xs" />
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-8 space-y-20">
          <div className="space-y-6">
            <div className="h-2 bg-white/20 w-32 tracking-widest" />
            <div className="space-y-4">
              <div className="h-5 bg-white/5 w-full rounded-xs" />
              <div className="h-5 bg-white/5 w-full rounded-xs" />
              <div className="h-5 bg-white/5 w-[90%] rounded-xs" />
              <div className="h-5 bg-white/5 w-[40%] rounded-xs" />
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <div className="h-3 bg-white/10 w-32" />
                <div className="h-2 bg-white/5 w-20" />
            </div>
            <div className="flex gap-8 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="shrink-0 space-y-4">
                  <div className="h-48 w-36 bg-white/5 rounded-xs border border-white/5" />
                  <div className="h-3 bg-white/10 w-28 rounded-xs" />
                  <div className="h-2 bg-white/5 w-20 rounded-xs" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white/3 p-10 rounded-sm border border-white/5 h-fit space-y-10">
          {[1, 2, 3].map((group) => (
            <div key={group} className="space-y-3">
               <div className="h-2 bg-white/10 w-12" />
               <div className="h-4 bg-white/10 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;