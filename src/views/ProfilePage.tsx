import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { 
  LogOut, User, Mail, ShieldCheck, 
  Clock, Bookmark, Heart, ChevronRight, 
  Lock, Edit3, KeyRound, X 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  
  // 1. State for handling which field is being edited
  const [activeModal, setActiveModal] = useState<null | 'name' | 'email' | 'password'>(null);
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '', password: '' });

  // 2. Mock Update Function (Connect this to your Backend API)
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Updating ${activeModal}:`, formData);
    // Add your axios/fetch logic here: await updateProfile(formData)
    setActiveModal(null); // Close modal on success
  };

  return (
    <div className="min-h-screen bg-app text-main p-6 md:p-12 pb-24 relative">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* HEADER: Identity */}
        <div className="flex items-center gap-6 pb-8 border-b border-white/5">
          <div className="w-20 h-20 bg-surface border border-white/10 flex items-center justify-center rounded-sm relative group">
             <User size={40} className="text-cinema-gold" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black uppercase tracking-tighter italic">
                {user?.name || "Member"}
              </h1>
              <button 
                onClick={() => setActiveModal('name')} 
                className="p-1.5 hover:bg-white/5 rounded-full text-dim hover:text-cinema-gold transition-all"
              >
                <Edit3 size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <ShieldCheck size={14} className="text-cinema-gold" />
              <span className="text-[10px] font-bold text-dim uppercase tracking-widest">Premium Account</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LIBRARY NAVIGATION */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Your Library</h3>
            <div className="space-y-2">
              {[
                { label: 'Recently Watched', icon: Clock, path: '/recent', color: 'text-blue-400' },
                { label: 'Bookmarks', icon: Bookmark, path: '/watchlist', color: 'text-cinema-gold' },
                { label: 'Favorites', icon: Heart, path: '/mylist', color: 'text-rose-500' },
              ].map((item) => (
                <Link key={item.label} to={item.path} className="group flex items-center justify-between p-4 bg-surface border border-white/5 rounded-sm hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <item.icon size={18} className={item.color} />
                    <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-700 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </section>

          {/* SECURITY SETTINGS */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Security Settings</h3>
            <div className="border border-white/5 rounded-sm divide-y divide-white/5">
              
              <div className="bg-surface p-4 mb-3 flex items-center justify-between group cursor-pointer" onClick={() => setActiveModal('email')}>
                <div className="flex items-center gap-4">
                  <Mail size={18} className="text-dim" />
                  <div>
                    <p className="text-[9px] font-bold text-dim uppercase tracking-widest">Email</p>
                    <p className="text-xs font-medium">{user?.email}</p>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-cinema-gold">Change</span>
              </div>

              <div className="bg-surface p-4 flex items-center justify-between group cursor-pointer" onClick={() => setActiveModal('password')}>
                <div className="flex items-center gap-4">
                  <KeyRound size={18} className="text-dim" />
                  <div>
                    <p className="text-[9px] font-bold text-dim uppercase tracking-widest">Password</p>
                    <p className="text-xs font-medium tracking-[0.3em]">••••••••</p>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-cinema-gold">Update</span>
              </div>
            </div>
          </section>
        </div>

        {/* LOGOUT */}
        <div className="pt-10 flex border-t border-white/5">
          <button onClick={logout} className="flex items-center gap-3 px-8 py-3 border border-rose-500/20 text-rose-500 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
            <LogOut size={14} /> Terminate Session
          </button>
        </div>
      </div>

      {/* 3. THE EDIT MODAL (Functional Overlay) */}
      {activeModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-surface border border-white/10 w-full max-w-md p-8 rounded-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase tracking-tighter italic">Update {activeModal}</h2>
              <button onClick={() => setActiveModal(null)} className="text-dim hover:text-white"><X size={20}/></button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-dim">New {activeModal}</label>
                <input 
                  type={activeModal === 'password' ? 'password' : 'text'}
                  autoFocus
                  className="auth-input"
                  placeholder={`Enter new ${activeModal}`}
                  value={activeModal === 'password' ? formData.password : activeModal === 'name' ? formData.name : formData.email}
                  onChange={(e) => setFormData({...formData, [activeModal!]: e.target.value})}
                  required
                />
                {
                  activeModal === 'password' && (
                    <>
                    <input 
                  type={activeModal === 'password' ? 'password' : 'text'}
                  autoFocus
                  className="auth-input"
                  placeholder={`Enter new ${activeModal}`}
                  value={activeModal === 'password' ? formData.password : activeModal === 'name' ? formData.name : formData.email}
                  onChange={(e) => setFormData({...formData, [activeModal!]: e.target.value})}
                  required
                />
                <input 
                  type={activeModal === 'password' ? 'password' : 'text'}
                  autoFocus
                  className="auth-input"
                  placeholder={`Enter new ${activeModal}`}
                  value={activeModal === 'password' ? formData.password : activeModal === 'name' ? formData.name : formData.email}
                  onChange={(e) => setFormData({...formData, [activeModal!]: e.target.value})}
                  required
                />
                    </>
                  )
                }
              </div>
              <button type="submit" className="auth-btn">Confirm Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;