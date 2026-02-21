import { useNavigate } from 'react-router-dom';
import { useMediaStore } from '../store/useMediaStore';
import type{ Movie } from '../types/movie';
import { useLocation } from 'react-router-dom';

export const useMediaNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToRecent } = useMediaStore();

  const goToDetails = (movie: Movie) => {
    addToRecent(movie);
    const mediaType = movie.type || movie.media_type || (movie.title ? 'movie' : 'tv');
    navigate(`/details/${mediaType}/${movie.id}`,{
      state:{from: location.state?.from || location.pathname}
    });
  };

  return { goToDetails };
};