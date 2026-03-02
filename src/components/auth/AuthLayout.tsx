import React from 'react'
import authBg from '../../assets/images/auth_bg.jpg';

const AuthLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-app transition-colors duration-500">
      <div className="absolute inset-0 z-0">
        <img 
          src={authBg} 
          className="w-full h-full object-cover opacity-100"
          alt="background"
        />
        <div className="absolute inset-0 bg-app/50 bg-linear-to-t from-app via-app/50 to-transparent" />
      </div>
      
      <div className="z-10 w-full max-w-md p-8 md:p-16 bg-surface-1/50 rounded-lg border border-border backdrop-blur-lg shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-main">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;