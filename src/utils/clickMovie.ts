import { useNavigate } from 'react-router-dom';
import { useMediaStore } from '../store/useMediaStore';
import type{ Movie } from '../types/movie';

export const useMediaNavigation = () => {
  const navigate = useNavigate();
  const { addToRecent } = useMediaStore();

  const goToDetails = (movie: Movie) => {
    addToRecent(movie);
    const mediaType = movie.type || movie.media_type || (movie.title ? 'movie' : 'tv');
    navigate(`/details/${mediaType}/${movie.id}`);
  };

  return { goToDetails };
};