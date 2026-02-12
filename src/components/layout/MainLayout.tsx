import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';

const MainLayout = () => {
  const { pathname } = useLocation();

  // Scroll to top whenever the URL changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-app selection:bg-cinema-gold selection:text-black">
      <Navbar />
      
      {/* The Outlet is where your pages (Landing, Details, etc.) will render */}
      <main className="grow">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;