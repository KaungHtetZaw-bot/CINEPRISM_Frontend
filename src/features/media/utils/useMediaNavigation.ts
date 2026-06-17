import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/media.type';
import { useLocation } from 'react-router-dom';
import { useAddToLists } from '../../user/api/useListQueries';

export const useMediaNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: addToRecent } = useAddToLists('recent');

  const goToDetails = (media: Movie) => {
    addToRecent(media);
    const mediaType = media.media_type || (media.title ? 'movie' : 'tv');
    navigate(`/details/${mediaType}/${media.id}`, {
      state: { from: location.state?.from || location.pathname }
    });
  };

  return { goToDetails };
};