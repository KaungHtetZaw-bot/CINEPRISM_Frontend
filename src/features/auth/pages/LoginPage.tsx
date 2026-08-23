import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import Alert from '../../../shared/components/Alert';
import { Loader2, Mail, Lock } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

const LoginPage = () => {
  const { login, error, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    const success = await login(formData);
    if (success) {
      navigate('/browse');
    }
  };

  return (
    <AuthLayout title="Sign In">
      {error && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2">
          <Alert
            message={error}
            type="error"
            onClose={() => useAuthStore.setState({ error: null })}
          />
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4 md:gap-5">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors">
            <Mail size={18} />
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email Address"
            className="auth-input pl-12 w-full h-14 md:h-16 text-base md:text-lg bg-surface-2/50 border-border focus:border-accent transition-all rounded-xl"
            required
          />
        </div>

        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors">
            <Lock size={18} />
          </div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Password"
            className="auth-input pl-12 w-full h-14 md:h-16 text-base md:text-lg bg-surface-2/50 border-border focus:border-accent transition-all rounded-xl"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="auth-btn mt-2 w-full h-14 md:h-16 bg-accent text-black font-black uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Authenticating</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="mt-8 flex flex-col items-center gap-4 text-sm">
        <div className="text-dim font-medium uppercase tracking-wider text-[11px] md:text-xs">
          <span className="opacity-60">New to CinePrism?</span>
          <Link to="/register" className="ml-2 text-main hover:text-accent transition-colors underline-offset-4 hover:underline">
            Sign up now.
          </Link>
        </div>

        <Link
          to="/forgot-password"
          className="text-dim/50 text-[10px] uppercase tracking-widest hover:text-main transition-colors"
        >
          Forgot Password?
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;