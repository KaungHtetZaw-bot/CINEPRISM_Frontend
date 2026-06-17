import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './shared/pages/LandingPage';
import ProtectedRoute from './app/routes/ProtectedRoute';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import HomePage from './features/media/pages/HomePage';
import NotFoundPage from './shared/pages/NotFoundPage';
import VIPPurchasePage from './features/subscription/pages/VIPPurchasePage';
import AuthCard from './features/auth/pages/AuthCard';
import MainLayout from './shared/layout/MainLayout';
import SearchPage from './features/media/pages/SearchPage';
import MediaPage from './features/media/pages/MediaPage';
import GenresPage from './features/media/pages/GenrsPage';
import MediaDetails from './features/media/pages/MediaDetailsPage';
import UserListPage from './features/user/pages/UserListPage';
import ProfilePage from './features/user/pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth" element={<AuthCard />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/browse" element={<HomePage />} />
            <Route path="/mylist/:type" element={<UserListPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/media/:type' element={<MediaPage />} />
            <Route path='/media/genres/movie' element={<GenresPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/vip-purchase' element={<VIPPurchasePage />} />
            {/* <Route path="/settings" element={<SettingsPage />} /> */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/details/:type/:id" element={<MediaDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;