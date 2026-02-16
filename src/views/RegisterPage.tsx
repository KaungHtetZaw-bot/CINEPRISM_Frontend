import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import OTPModal from "../components/auth/OTPModal";
import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Alert from "../components/ui/Alert";


const RegisterPage = () => {
  const { register, verifyOTP, error } = useAuthStore();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: location.state?.email || '',
    password: '',
  });
  const [showOTP, setShowOTP] = useState(false);

  const handleInitialSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.name || !formData.email || !formData.password) {
    alert('Please fill in all fields');
    return;
  }

  try {
    await register(formData);
    setShowOTP(true); 
  } catch (error: any) {
    alert(error || 'Registration failed. Try a different email.');
  }
};

  const handleVerifyComplete = async (code: string) => {
    try {
      await verifyOTP({ email: formData.email, code });
      navigate('/browse'); 
    } catch (error: any) {
      alert('Invalid code. Please try again.');
    }
  };

  useEffect(() => {
    if (error) setShowAlert(true);
  }, [error]);
  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={handleInitialSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Full Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="auth-input"
        />
        <input 
          type="email" 
          placeholder="Email address" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="auth-input"
        />
        <input 
          type="password" 
          placeholder="Create Password" 
          value={formData.password}
          onChange={(e)=> setFormData({...formData,password:e.target.value})}
          className="auth-input"
        />
        <button type="submit" className="auth-btn">
          Start Watching
        </button>
      </form>

      <div className="mt-6 text-muted">
        <span className="mr-2">Already have an account?</span>
        <Link to="/login" className="text-white hover:underline font-medium">Sign in.</Link>
      </div>

      <OTPModal 
        isOpen={showOTP} 
        email={formData.email} 
        onClose={() => setShowOTP(false)}
        onVerify={handleVerifyComplete}
      />
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

export default RegisterPage;