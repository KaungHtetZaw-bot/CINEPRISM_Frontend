import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import OTPModal from "../components/auth/OTPModal";
import { useState } from "react";

// src/pages/RegisterPage.tsx
const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [showOTP, setShowOTP] = useState(false);

    const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic: 1. Validate form, 2. Call backend to send OTP, 3. Show Popup
    setShowOTP(true);
  };

  const handleVerifyComplete = (code: string) => {
    console.log("Verifying code on backend:", code);
    // On success:
    // navigate('/browse'); 
  };
  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={handleInitialSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Full Name" 
          className="auth-input"
        />
        <input 
          type="email" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input 
          type="password" 
          placeholder="Create Password" 
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
        email={email} 
        onClose={() => setShowOTP(false)}
        onVerify={handleVerifyComplete}
      />
    </AuthLayout>
  );
};

export default RegisterPage;