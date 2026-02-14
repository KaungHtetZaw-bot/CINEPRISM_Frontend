import React from 'react'
import authBg from '../../assets/images/auth_bg.jpg';

const AuthLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-transparent">
      <div className="absolute inset-0 z-0">
        <img 
          src={authBg} 
          className="w-full h-full object-cover opacity-50"
          alt="background"
        />
        <div className="absolute inset-0 bg-black/30 bg-linear-to-t from-black/20 via-transparent to-black/20" />
      </div>
      <div className="relative z-10 w-full max-w-md p-8 md:p-16 bg-transparent rounded-lg border border-white/10 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout