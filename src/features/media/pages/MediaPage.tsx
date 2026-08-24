import { useParams, Navigate } from 'react-router-dom';
import InfiniteGrid from '../components/InfiniteGrid';

/**
 * Serves two URL shapes:
 *   /media/:type                          popular browse
 *   /media/:type/genre/:genreId/:slug?    genre-filtered browse
 */
const MediaPage = () => {
  const { type, genreId, slug } = useParams<{
    type: string;
    genreId?: string;
    slug?: string;
  }>();

  if (type !== 'movie' && type !== 'tv') {
    return <Navigate to="/browse" replace />;
  }

  if (genreId !== undefined && !/^\d+$/.test(genreId)) {
    return <Navigate to={`/media/${type}`} replace />;
  }

  return (
    <InfiniteGrid
      type={type}
      genreId={genreId ?? null}
      genreName={slug ?? null}
    />
  );
};

export default MediaPage;
