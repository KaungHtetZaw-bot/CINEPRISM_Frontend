import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { useState } from 'react';
import { useAuthStore } from "../store/useAuthStore"
import Alert from '../components/ui/Alert';

const LoginPage = () => {
  const { login, error,isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    try {
      await login(formData);
      navigate('/browse');
    } catch (err: any) {
      setShowAlert(true);
    }
  };
  return (
    <AuthLayout title="Sign In">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input 
          type="email" 
          value={formData.email}
          onChange={(e) => setFormData({...formData,email:e.target.value})}
          placeholder="Email or phone number" 
          className="auth-input"
        />
        <input 
          type="password" 
          value={formData.password}
          onChange={(e) => setFormData({...formData,password:e.target.value})}
          placeholder="Password" 
          className="auth-input"
        />
        <button type="submit" className="auth-btn" disabled={isLoading}>
          {isLoading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-6 text-muted">
        <span className="mr-2">New to YourCinema?</span>
        <Link to="/register" className="text-white hover:underline font-medium">Sign up now.</Link>
      </div>
      {showAlert && error && (
        <Alert 
          message={error} 
          type="error" 
          onClose={() => setShowAlert(false)} 
        />
      )}
    </AuthLayout>
  );
};

export default LoginPage;