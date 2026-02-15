import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-app text-white">
      {/* Desktop Sidebar */}
      <div className="sm:block hidden">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-x-hidden relative">
        {/* Mobile Top Header */}
        <div className="sm:hidden sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-md p-4 border-b border-white/5">
          <div className="flex flex-col">
            <Logo />
          </div>
        </div>

        
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default MainLayout;