import { useNavigate } from 'react-router-dom';
import type{ Movie } from '../types/movie';
import { useLocation } from 'react-router-dom';
import { useAddToLists } from '../queries/mediaQueries';

export const useMediaNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: addToRecent } = useAddToLists('recent');

  const goToDetails = (movie: Movie) => {
    addToRecent(movie);
    const mediaType = movie.type || movie.media_type || (movie.title ? 'movie' : 'tv');
    navigate(`/details/${mediaType}/${movie.id}`,{
      state:{from: location.state?.from || location.pathname}
    });
  };

  return { goToDetails };
};