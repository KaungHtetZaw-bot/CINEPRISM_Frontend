import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTrending, fetchPopular } from '../store/slices/mediaSlice';
import MainLayout from '../components/layout/MainLayout';
import MovieRow from '../components/movie/MovieRow';
import Spotlight from '../components/movie/Spotlight';

const Home = () => {
  const dispatch = useAppDispatch();
  const { trending, popularMovies, popularTV, status } = useAppSelector((state) => state.media);
  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchPopular('movie'));
    dispatch(fetchPopular('tv'));
  }, [dispatch]);

  const sections = [
    { title: "Trending Now", data: trending },
    { title: "Popular Movies", data: popularMovies || [] },
    { title: "Binge-worthy TV Shows", data: popularTV || [] },
  ];

  const spotlightMovie = trending[0];

  return (
    <MainLayout>
      <div className='relative h-150'>
        <Spotlight movie={spotlightMovie} isLoading={isLoading} />
      </div>
      <div className="pb-24 -mt-32 relative z-10 space-y-12">
        {sections.map((section) => (
          <div key={section.title} className="px-4 md:px-6">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
              {section.title}
            </h2>
            <MovieRow movies={section.data.slice(0, 10)} isLoading={isLoading} />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;