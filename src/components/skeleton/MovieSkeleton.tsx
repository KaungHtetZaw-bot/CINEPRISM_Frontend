const MovieSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-surface border border-input-border shadow-sm">
      <div className="aspect-2/3 w-full bg-input-bg relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] 
          bg-linear-to-r from-transparent via-main/5 to-transparent" />
      </div>
    </div>
  );
};
export default MovieSkeleton;