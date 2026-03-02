import MovieRow from '../components/movie/MovieRow';
import Spotlight from '../components/movie/Spotlight';
import { useTrending,usePopular } from '../queries/mediaQueries';

const HomePage = () => {
const { data: trending = [], isLoading } = useTrending();
const { data: popularMovies = [] } = usePopular('movie', 1);
const { data: popularTV = [] } = usePopular('tv', 1);

  const sections = [
    { title: "Trending Now", data: trending || [] },
    { title: "Popular Movies", data: popularMovies || [] },
    { title: "Binge-worthy TV Shows", data: popularTV || [] },
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