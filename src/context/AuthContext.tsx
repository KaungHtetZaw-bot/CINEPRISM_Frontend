import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({ isAuthenticated: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated] = useState(false); 

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);