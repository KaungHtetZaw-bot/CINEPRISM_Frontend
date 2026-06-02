import MovieRow from '../../features/media/components/MovieRow';
import Spotlight from '../../shared/ui/components/media/Spotlight';
import { useInfinitePopularMoviesOrTv } from '../../features/media/hooks/useInfinitePopularMoviesOrTv';
import { useTrendingMedia } from '../../features/media/hooks/useTrendingMedia';
import { useGenres } from '../../queries/mediaQueries';
import { useEffect } from 'react';

const HomePage = () => {
const { data: trending = [], isLoading } = useTrendingMedia();
const { data: infinitePopularMovies } = useInfinitePopularMoviesOrTv('movie');
const { data: infinitePopularTv } = useInfinitePopularMoviesOrTv('tv');
const { data: geners } = useGenres('movie');

  const sections = [
    { title: "Trending Now", data: trending || [] },
    { title: "Popular Movies", data: infinitePopularMovies?.pages?.[0]?.results || [] },
    { title: "Binge-worthy TV Shows", data: infinitePopularTv?.pages?.[0]?.results || [] },
  ];
  const spotlightMovie = trending[0];

  useEffect(() => {
    console.log('Genres:', geners);
  }, [geners]);

  return (
    <>
      <Spotlight movie={spotlightMovie} isLoading={isLoading} />
      <div className='h-[20vh]'></div>
      <div className="-mt-32 relative">
        {sections.map((section) => (
          <div key={section.title} className="px-4 md:px-6">
            <h2 className="text-xl md:text-2xl font-bold text-main tracking-tight">
              {section.title}
            </h2>
            <MovieRow movies={section.title == "Trending Now" ? section.data.slice(1, 11) : section.data.slice(0, 10)} isLoading={isLoading} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;