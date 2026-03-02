import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import ScrollToTop from '../shared/ScrollToTop';
import Navbar from './Navbar';

const MainLayout = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-app text-main overflow-hidden">
      <aside className="hidden sm:block">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <MobileHeader />
        {/* <Navbar/> */}

        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto overflow-x-hidden pb-24 sm:pb-0"
        >
          <Outlet />
        </main>

        <ScrollToTop mainRef={mainRef}/>

        <BottomNav />
      </div>
    </div>
  );
};

export default MainLayout;