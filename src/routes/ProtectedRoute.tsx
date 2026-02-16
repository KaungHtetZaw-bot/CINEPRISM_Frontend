import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = () => {
  const { token, isLoading } = useAuthStore();
  if (isLoading) {
    return <div className="bg-app min-h-screen" />;
  }
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;