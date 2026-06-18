import { useParams, Navigate } from 'react-router-dom';
import InfiniteGrid from '../components/InfiniteGrid';

const MediaPage = () => {
  const { type, genreId, genreName } = useParams();

  if (type !== 'movie' && type !== 'tv') {
    return <Navigate to="/browse" replace />;
  }

  return <InfiniteGrid type={type} genreId = {genreId ? genreId : null} genreName = {genreName ? genreName : null} />;
};

export default MediaPage;