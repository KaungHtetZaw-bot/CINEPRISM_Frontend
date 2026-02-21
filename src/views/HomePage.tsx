import { useEffect } from 'react';
import MovieRow from '../components/movie/MovieRow';
import Spotlight from '../components/movie/Spotlight';
import { useMediaStore } from '../store/useMediaStore';

const HomePage = () => {
  const { trending, popularMovies, popularTV, isLoading, fetchTrending, fetchPopularMovies, fetchPopularTV } = useMediaStore();

useEffect(() => {
  fetchTrending();
  fetchPopularMovies();
  fetchPopularTV();
}, []);

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
      <div className="pb-24 -mt-32 relative">
        {sections.map((section) => (
          <div key={section.title} className="px-4 md:px-6">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {section.title}
            </h2>
            <MovieRow movies={section.data.slice(0, 10)} isLoading={isLoading} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;