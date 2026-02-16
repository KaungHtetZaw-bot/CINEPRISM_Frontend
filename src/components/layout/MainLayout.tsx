import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-app text-white overflow-hidden">
      <aside className="hidden sm:block">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <MobileHeader />

        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 sm:pb-0">
          <Outlet />
        </main>

        <div>
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;