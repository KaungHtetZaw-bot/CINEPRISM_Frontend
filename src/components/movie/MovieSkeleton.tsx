import React from 'react'

const MovieSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-surface border border-glass-border">
      <div className="aspect-2/3 w-full bg-muted/20 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 bg-muted/20 animate-pulse rounded" />
        <div className="h-3 w-1/4 bg-muted/20 animate-pulse rounded" />
      </div>
    </div>
  );
};
export default MovieSkeleton