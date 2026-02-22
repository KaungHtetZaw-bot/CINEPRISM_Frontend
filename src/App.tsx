import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import MainLayout from './components/layout/MainLayout';
import RecentPage from './views/RecentPage';
import Details from './views/DetailsPage';
import SearchPage from './views/SearchPage';
import HomePage from './views/HomePage';
import NotFoundPage from './views/NotFoundPage';
import MediaPage from './views/MediaPage';
import ProfilePage from './views/ProfilePage';

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
          <Route path="/recent" element={<RecentPage />} />
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/media/:type' element={<MediaPage />} />
          <Route path='/profile' element={<ProfilePage />} />
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