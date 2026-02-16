import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Logo from './Logo';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-app text-white">
      <div className="sm:block hidden">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-x-hidden relative">
        <div className="sm:hidden w-full top-0 z-5 p-4 border-b border-white/5">
          <Logo />
        </div>
        <Outlet />
      </main>
      <div className="sm:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default MainLayout;