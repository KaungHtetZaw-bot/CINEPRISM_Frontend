import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './app/pages/LandingPage';
import ProtectedRoute from './app/routes/ProtectedRoute';
import LoginPage from './app/pages/LoginPage';
import RegisterPage from './app/pages/RegisterPage';
import MainLayout from './components/layout/MainLayout';
import UserListPage from './app/pages/UserListPage';
import Details from './app/pages/MediaDetailsPage';
import SearchPage from './app/pages/SearchPage';
import HomePage from './app/pages/HomePage';
import NotFoundPage from './app/pages/NotFoundPage';
import MediaPage from './app/pages/MediaPage';
import ProfilePage from './app/pages/ProfilePage';
import VIPPurchasePage from './app/pages/VIPPurchasePage';

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
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/media/:type' element={<MediaPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/vip-purchase' element={<VIPPurchasePage />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
        </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/details/:type/:id" element={<Details />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;