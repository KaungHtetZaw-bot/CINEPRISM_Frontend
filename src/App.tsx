import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import Home from './views/Home';
import RecentPage from './views/RecentPage';
import Details from './views/DetailsPage';
import MainLayout from './components/layout/MainLayout';
import SearchPage from './views/SearchPage';
import MoviePage from './views/MoviePage';
import TvSeriesPage from './views/TvSeriesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/browse" element={<Home />} />
          <Route path="/recent" element={<RecentPage />} />
          <Route path="/details/:type/:id" element={<Details />} />
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/movies' element={<MoviePage/>} />
          <Route path='/tv-shows' element={<TvSeriesPage/>} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
        </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;