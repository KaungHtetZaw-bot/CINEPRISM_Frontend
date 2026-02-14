import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';

const LoginPage = () => {
  return (
    <AuthLayout title="Sign In">
      <form className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="Email or phone number" 
          className="auth-input"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="auth-input"
        />
        <button className="auth-btn">
          Sign In
        </button>
      </form>
      
      <div className="mt-6 text-muted">
        <span className="mr-2">New to YourCinema?</span>
        <Link to="/register" className="text-white hover:underline font-medium">Sign up now.</Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;