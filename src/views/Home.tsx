import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTrending, fetchPopular } from '../store/slices/mediaSlice';
import Sidebar from '../components/layout/Sidebar';
import BottomNav from '../components/layout/BottomNav';
import MovieGrid from '../components/movie/MovieGrid';
import { EllipsisVertical } from 'lucide-react';
import Logo from '../components/layout/Logo';

const Home = () => {
  const dispatch = useAppDispatch();
  
  const { trending, popular, status } = useAppSelector((state) => state.media);
  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchPopular('movie'));
    dispatch(fetchPopular('tv'));
  }, [dispatch]);

  const sections = [
    { title: "Trending Now", data: trending },
    { title: "Popular Movies", data: popular.filter(m => m.type === 'movie') },
    { title: "Binge-worthy TV Shows", data: popular.filter(m => m.type === 'tv') },
  ];

  return (
    <div className="flex min-h-screen bg-app">
      <div className='sm:block hidden'>
        <Sidebar />
      </div>

      <main className="flex-1 overflow-x-hidden relative">
        <div className='sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-md p-4 md:p-6 border-b border-white/5'>
          <div className="max-w-2xl mx-auto relative flex flex-col">
            <Logo />
            {/* <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-dim hover:text-white">
              <EllipsisVertical size={24} />
            </button> */}
          </div>
        </div>
        <div className="pb-24 m-0 relative z-10 space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="px-4 md:px-6">
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {section.title}
              </h2>
              <MovieGrid movies={section.data} isLoading={isLoading} />
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