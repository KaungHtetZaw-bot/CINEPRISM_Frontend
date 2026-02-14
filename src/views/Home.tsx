import BottomNav from '../components/layout/BottomNav';
import Sidebar from '../components/layout/Sidebar';
import MovieGrid from '../components/movie/MovieGrid';
import { useMovies } from '../hooks/useMovies';

const Home = () => {
    const { movies, isLoading } = useMovies();
  const categories = [
    { title: "Trending Now", endpoint: "/trending" },
    { title: "Action Masterpieces", endpoint: "/action" },
    { title: "Binge-worthy TV Shows", endpoint: "/tv" },
    { title: "Award Winning Dramas", endpoint: "/drama" },
  ];

  return (
    <div className="flex min-h-screen bg-app">
     <div className='sm:block hidden'>
      <Sidebar />
     </div>
      <main className="flex-1 overflow-x-hidden">
      <div className='h-30'></div>
        <div className="pb-20 -mt-24 relative z-10 space-y-4">
          {categories.map((cat) => (
            <div key={cat.title} className="pl-4 md:pl-12">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{cat.title}</h2>
              <MovieGrid movies={movies} isLoading={isLoading} />
            </div>
          ))}
        </div>
      </main>
      <div className="sm:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Home;