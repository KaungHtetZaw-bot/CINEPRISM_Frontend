const TMDB_BASE_URL = "https://image.tmdb.org/t/p/";

export const getImageUrl = (path: string | null, size: "w500" | "original" | "w200" = "w500") => {
  if (!path) return "/placeholder-poster.png";
  return `${TMDB_BASE_URL}${size}${path}`;
};