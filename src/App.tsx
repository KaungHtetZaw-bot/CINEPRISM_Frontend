import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage';
// import HomePage from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}

          <Route element={<ProtectedRoute />}>
            {/* When authenticated, these render inside the Browse Layout */}
            {/* <Route path="/browse" element={<BrowsePage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<SearchPage />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;