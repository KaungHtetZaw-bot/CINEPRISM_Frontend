import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoute = () => {
  // Check Redux state instead of Context
  const { token } = useAppSelector((state) => state.auth);

  // While checking the token on initial load, you might want a loading state
  if (status === 'loading') {
    return <div className="bg-app min-h-screen" />; // Or a spinner
  }

  // If there's a token, show the content (Outlet), otherwise send to landing
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;