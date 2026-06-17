import { useState } from 'react';

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
  };

  const handleFocus = (field: string) => {
    setFocusedInput(field);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your login or authentication logic here
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen selection:bg-secondary selection:text-on-secondary flex flex-col relative overflow-x-hidden">
  {/* Immersive Background Wrapper */}
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 cinematic-gradient z-10"></div>
    <img 
      className="w-full h-full object-cover scale-110 blur-sm opacity-60" 
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo3DwXkQo1qNLljGQeZGBryFDz6gPx4Hn9JuSxo7XuJppW0RQJ1FFFjbjignUfwv4QX9x359kiBZG0IP6Ttwchy2jaAHz0I4Z1jsHOJWzLWGKitMiJieakH-wMECUJpGxDEHnTUv-GqF4WVAaROajqvlOjzdCE_C8Bsxpy-R8mACibFbmpD5pGJrK69G3uamntgOhPLHmsIRdDLTr50EdRn1N0Crq3FCqP7FPTT4jAna4UgS3BgsK-RqviXypok3CynZ4JVWXsuF2X"
      alt="Cinematic theater background"
    />
  </div>

  {/* Navigation Header — FIXED: added 'top-0' and optional 'glass-panel/backdrop-blur' */}
  <header className="sticky top-0 z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-8 glass-panel backdrop-blur-md">
    <div className="flex items-center gap-2">
      <span className="text-headline-lg font-headline-lg font-extrabold text-primary tracking-tighter">CinePrism</span>
    </div>
    <div className="flex items-center gap-6">
      <a className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary transition-colors" href="#help">Help</a>
      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center cursor-pointer">
        <span className="material-symbols-outlined text-on-surface-variant">language</span>
      </div>
    </div>
  </header>

  {/* Main Content Grid — FIXED: adjusted padding-top offset for the sticky layout space */}
  <main className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-margin-mobile pt-10 pb-16 my-auto">
    <div className="w-full max-w-[480px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Auth Card */}
      <div className="glass-panel rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden shimmer-effect">
        
        {/* Toggle Tab */}
        <div className="flex border-b border-white/10 mb-8">
          <button 
            className={`flex-1 pb-4 text-label-lg font-label-lg transition-all ${activeTab === 'login' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => handleTabChange('login')}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 pb-4 text-label-lg font-label-lg transition-all ${activeTab === 'register' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => handleTabChange('register')}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h2 className="text-headline-md font-headline-md text-primary">Welcome Back</h2>
              <p className="text-body-md font-body-md text-on-surface-variant">The stories are waiting for you.</p>
            </div>
            
            <div className="space-y-4">
              <div className="group">
                <label className={`block text-label-sm font-label-sm mb-2 px-1 transition-colors ${focusedInput === 'login-email' ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  EMAIL ADDRESS
                </label>
                <input 
                  className="w-full h-12 px-4 rounded-lg input-glass text-on-surface font-body-md" 
                  placeholder="name@company.com" 
                  type="email"
                  onFocus={() => handleFocus('login-email')}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="group">
                <div className="flex justify-between items-center mb-2 px-1">
                  <label className={`block text-label-sm font-label-sm transition-colors ${focusedInput === 'login-password' ? 'text-secondary' : 'text-on-surface-variant'}`}>
                    PASSWORD
                  </label>
                  <a className="text-label-sm font-label-sm text-secondary hover:underline" href="#forgot">Forgot?</a>
                </div>
                <input 
                  className="w-full h-12 px-4 rounded-lg input-glass text-on-surface font-body-md" 
                  placeholder="••••••••" 
                  type="password"
                  onFocus={() => handleFocus('login-password')}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </div>
            
            <button className="w-full h-14 bg-primary text-on-primary font-bold text-label-lg rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg" type="submit">
              Sign In
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h2 className="text-headline-md font-headline-md text-primary">Start Watching</h2>
              <p className="text-body-md font-body-md text-on-surface-variant">Join the community of cinema lovers.</p>
            </div>
            
            <div className="space-y-4">
              <div className="group">
                <label className={`block text-label-sm font-label-sm mb-2 px-1 transition-colors ${focusedInput === 'reg-name' ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  FULL NAME
                </label>
                <input 
                  className="w-full h-12 px-4 rounded-lg input-glass text-on-surface font-body-md" 
                  placeholder="John Doe" 
                  type="text"
                  onFocus={() => handleFocus('reg-name')}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="group">
                <label className={`block text-label-sm font-label-sm mb-2 px-1 transition-colors ${focusedInput === 'reg-email' ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  EMAIL ADDRESS
                </label>
                <input 
                  className="w-full h-12 px-4 rounded-lg input-glass text-on-surface font-body-md" 
                  placeholder="name@company.com" 
                  type="email"
                  onFocus={() => handleFocus('reg-email')}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="group">
                <label className={`block text-label-sm font-label-sm mb-2 px-1 transition-colors ${focusedInput === 'reg-password' ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  PASSWORD
                </label>
                <input 
                  className="w-full h-12 px-4 rounded-lg input-glass text-on-surface font-body-md" 
                  placeholder="Min. 8 characters" 
                  type="password"
                  onFocus={() => handleFocus('reg-password')}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </div>
            
            <button className="w-full h-14 bg-primary text-on-primary font-bold text-label-lg rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg" type="submit">
              Create Account
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-label-sm font-label-sm">
            <span className="px-4 bg-[#0f1320] text-on-surface-variant">OR CONTINUE WITH</span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4">
          <button className="h-12 flex items-center justify-center gap-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-on-surface">
            <img alt="Google" className="w-5 h-5 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcbjgeatEr6LKw2XGCL53s-5h209IVU3JgVpnuChVvf_9pjZiY4ABAh47Mna2kPeIpay3PAzKxnbWGubJSotivSFhrIBrzcy_D4ykAN7NZIcvKFK6Cg6e1j55ZJyV_F6ggz4meHRwmkH05aQ0wocXX_ML2QI41Jhz5VJ41zCVcnqsC1fYLM8LO81_bnzMeubj6pfwI7OLUhLhij2OKKbVtIneGeNkFgfk4lNKtQdpmrJdgAOofPbhCpVj37fIvqiIpRKut8eOW0aOk" />
            <span className="text-label-lg font-label-lg">Google</span>
          </button>
          <button className="h-12 flex items-center justify-center gap-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-on-surface">
            <span className="material-symbols-outlined text-on-surface-variant">ios</span>
            <span className="text-label-lg font-label-lg">Apple</span>
          </button>
        </div>
      </div>

      {/* Perks Section */}
      <div className="grid grid-cols-3 gap-4 px-4 py-2">
        <div className="text-center">
          <span className="material-symbols-outlined text-secondary mb-1">hd</span>
          <p className="text-label-sm font-label-sm text-on-surface-variant">Ultra HD</p>
        </div>
        <div className="text-center">
          <span className="material-symbols-outlined text-secondary mb-1">devices</span>
          <p className="text-label-sm font-label-sm text-on-surface-variant">Multi-device</p>
        </div>
        <div className="text-center">
          <span className="material-symbols-outlined text-secondary mb-1">offline_pin</span>
          <p className="text-label-sm font-label-sm text-on-surface-variant">Offline</p>
        </div>
      </div>
    </div>
  </main>

  {/* Footer */}
  <footer className="relative z-20 w-full flex flex-col items-center py-12 px-margin-mobile md:px-margin-desktop gap-6 mt-auto">
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
      <a className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#privacy">Privacy Policy</a>
      <a className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#terms">Terms of Service</a>
      <a className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#help">Help Center</a>
      <a className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#contact">Contact Us</a>
      <a className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#careers">Careers</a>
    </div>
    <p className="text-label-sm font-label-sm text-on-surface-variant opacity-60">© 2024 CinePrism Streaming. All rights reserved.</p>
  </footer>
</div>
  );
}