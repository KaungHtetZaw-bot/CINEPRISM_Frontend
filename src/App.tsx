import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage';
// import HomePage from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import { Provider } from 'react-redux';
import { store } from './store';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import Home from './views/Home';
import RecentPage from './views/RecentPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
          <Route path="/browse" element={<Home />} />
          <Route path='/recent' element={<RecentPage />} />
            {/* When authenticated, these render inside the Browse Layout */}
            {/* <Route path="/browse" element={<BrowsePage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<SearchPage />} /> */}
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;