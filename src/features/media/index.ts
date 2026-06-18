export { default as HomePage } from './pages/HomePage';
export { default as MediaDetailsPage } from './pages/MediaDetailsPage';
export { default as MediaPage } from './pages/MediaPage';
export { default as GenresPage } from './pages/GenresPage';
export { default as SearchPage } from './pages/SearchPage';
export {
  useGenres,
  useTrendingMedia,
  useInfinitePopularMoviesOrTv,
  useSearch,
  useMediaDetails
} from './api/mediaQueries';
