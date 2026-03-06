import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import OTPModal from "../components/auth/OTPModal";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Alert from "../components/ui/Alert";
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";

const RegisterPage = () => {
  const { register, verifyOTP, error, isLoading } = useAuthStore();
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
      useAuthStore.setState({ error: 'Please fill in all fields' });
      return;
    }

    try {
      await register(formData);
      setShowOTP(true); 
    } catch (err: any) {
      // Error is handled by useAuthStore and caught by the useEffect below
    }
  };

  const handleVerifyComplete = async (code: string) => {
    try {
      await verifyOTP( formData, code );
      navigate('/browse'); 
    } catch (err: any) {
    }
  };

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error]);

  return (
    <AuthLayout title="Create Account">
      {/* ERROR FEEDBACK */}
      {showAlert && error && (
        <div className="mb-6">
          <Alert 
            message={error} 
            type="error" 
            onClose={() => {
              setShowAlert(false);
              useAuthStore.setState({ error: null });
            }} 
          />
        </div>
      )}

      <form onSubmit={handleInitialSubmit} className="flex flex-col gap-4 md:gap-5">
        {/* Full Name */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors">
            <User size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="auth-input pl-12 w-full h-14 md:h-16 text-base bg-surface-2/50 border-border focus:border-accent rounded-xl"
            required
          />
        </div>

        {/* Email */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors">
            <Mail size={18} />
          </div>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="auth-input pl-12 w-full h-14 md:h-16 text-base bg-surface-2/50 border-border focus:border-accent rounded-xl"
            required
          />
        </div>

        {/* Password */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors">
            <Lock size={18} />
          </div>
          <input 
            type="password" 
            placeholder="Create Password" 
            value={formData.password}
            onChange={(e)=> setFormData({...formData, password: e.target.value})}
            className="auth-input pl-12 w-full h-14 md:h-16 text-base bg-surface-2/50 border-border focus:border-accent rounded-xl"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="auth-btn mt-2 w-full h-14 md:h-16 bg-accent text-black font-black uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Start Watching <ArrowRight size={18} strokeWidth={3} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-dim font-medium uppercase tracking-wider text-[11px]">Already have an account?</span>
        <Link to="/login" className="ml-2 text-main hover:text-accent font-bold underline underline-offset-4 decoration-accent/30 transition-colors">
          Sign In.
        </Link>
      </div>

      {/* OTP Modal with Backdrop Blur */}
      <OTPModal 
        isOpen={showOTP} 
        email={formData.email} 
        onClose={() => setShowOTP(false)}
        onVerify={handleVerifyComplete}
      />
    </AuthLayout>
  );
};

export default RegisterPage;