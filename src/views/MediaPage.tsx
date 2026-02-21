import { useParams, Navigate } from 'react-router-dom';
import InfiniteGrid from '../components/movie/InfiniteGrid';

const MediaPage = () => {
  const { type } = useParams();

  if (type !== 'movie' && type !== 'tv') {
    return <Navigate to="/browse" replace />;
  }

  return <InfiniteGrid type={type} />;
};

export default MediaPage;