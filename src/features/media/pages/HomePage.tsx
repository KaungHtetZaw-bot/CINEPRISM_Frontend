
import { useInfinitePopularMoviesOrTv, useTrendingMedia } from '../api/mediaQueries';
import MovieRow from '../components/MovieRow';
import Spotlight from '../components/Spotlight';

const HomePage = () => {
  const { data: trending = [], isLoading } = useTrendingMedia();
  const { data: infinitePopularMovies } = useInfinitePopularMoviesOrTv('movie');
  const { data: infinitePopularTv } = useInfinitePopularMoviesOrTv('tv');

  const sections = [
    { title: "Trending Now", data: trending || [] },
    { title: "Popular Movies", data: infinitePopularMovies?.pages?.[0]?.results || [] },
    { title: "Binge-worthy TV Shows", data: infinitePopularTv?.pages?.[0]?.results || [] },
  ];
  const spotlightMovie = trending[0];

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