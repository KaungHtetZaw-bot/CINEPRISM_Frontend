import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LoginPage, RegisterPage } from './features/auth';
import { HomePage, MediaPage, GenresPage, SearchPage, MediaDetailsPage } from './features/media';
import { VIPPurchasePage } from './features/subscription';
import { ProfilePage, UserListPage } from './features/user';
import ProtectedRoute from './app/routes/ProtectedRoute';
import LandingPage from './shared/pages/LandingPage';
import MainLayout from './shared/layout/MainLayout';
import NotFoundPage from './shared/pages/NotFoundPage';

/**
 * URL structure (all media pages live under /media):
 *   /media/genres/:type                    genre picker (movie | tv)
 *   /media/:type                           popular browse
 *   /media/:type/genre/:genreId/:slug?     genre-filtered results
 *   /media/:type/:id                       details page
 */

const LegacyDetailsRedirect = () => {
  const { type, id } = useParams();
  return <Navigate to={`/media/${type}/${id}`} replace />;
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/browse" element={<HomePage />} />
            <Route path="/mylist/:type" element={<UserListPage />} />
            <Route path='/search' element={<SearchPage />} />

            <Route path="/media" element={<Navigate to="/browse" replace />} />
            <Route path='/media/genres' element={<Navigate to='/media/genres/movie' replace />} />
            <Route path='/media/genres/:type' element={<GenresPage />} />
            <Route path='/media/:type/genre/:genreId/:slug?' element={<MediaPage />} />
            <Route path='/media/:type' element={<MediaPage />} />
            <Route path='/media/:type/:id' element={<MediaDetailsPage />} />

            {/* Legacy URLs */}
            <Route path='/details/:type/:id' element={<LegacyDetailsRedirect />} />

            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/vip-purchase' element={<VIPPurchasePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;