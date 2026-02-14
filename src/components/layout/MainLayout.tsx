import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-app selection:bg-cinema-gold selection:text-black">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;