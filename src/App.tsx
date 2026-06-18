import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './shared/pages/LandingPage';
import ProtectedRoute from './app/routes/ProtectedRoute';
import { LoginPage, RegisterPage, AuthCard } from './features/auth';
import { HomePage, MediaPage, GenresPage, SearchPage, MediaDetailsPage } from './features/media';
import { VIPPurchasePage } from './features/subscription';
import { ProfilePage, UserListPage } from './features/user';
import MainLayout from './shared/layout/MainLayout';
import NotFoundPage from './shared/pages/NotFoundPage';

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
          <Route path="/details/:type/:id" element={<MediaDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;