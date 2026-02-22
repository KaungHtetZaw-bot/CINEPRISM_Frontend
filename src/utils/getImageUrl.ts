const TMDB_BASE_URL = "https://image.tmdb.org/t/p/";

export const getImageUrl = (path: string | null, size: 'w200' | 'w500' | 'w780' | 'w1280' | 'original' = "w500") => {
  if (!path) return "/placeholder-poster.png";
  return `${TMDB_BASE_URL}${size}${path}`;
};