import { useAuthStore } from '../store/useAuthStore';
import { 
  Shield, Mail, Lock, LogOut, 
  Crown, Clock, Heart, PlayCircle, 
  ChevronRight, ArrowRight 
} from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-app text-white px-6 md:px-16 py-12 pb-32">
      <div className="max-w-5xl mx-auto space-y-12">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info */}
          <div className="lg:col-span-2 flex items-center gap-6 p-8 bg-white/2 border border-white/5 rounded-sm">
            <div className="w-20 h-20 bg-cinema-gold flex items-center justify-center text-black text-3xl font-black italic rounded-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter">{user?.name}</h1>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">ID: #8829-XCD</p>
            </div>
          </div>

          {/* VIP Status Card */}
          <div className="relative overflow-hidden p-8 bg-linear-to-br from-cinema-gold/20 to-transparent border border-cinema-gold/30 rounded-sm">
            <Crown className="absolute -right-4 -top-4 w-24 h-24 text-cinema-gold/10 -rotate-12" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cinema-gold">Plan Status</span>
              </div>
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">VIP Premium</h2>
                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-1">Expires: 12.04.2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CONTENT NAVIGATION (Quick Access) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'My Favorites', icon: Heart, count: '12', path: '/library' },
            { label: 'Recent Watch', icon: PlayCircle, count: '48', path: '/recent' },
            { label: 'Watchlist', icon: Clock, count: '09', path: '/watchlist' },
          ].map((item) => (
            <button key={item.label} className="group flex items-center justify-between p-6 bg-white/3 border border-white/5 rounded-sm hover:border-cinema-gold/40 transition-all">
              <div className="flex items-center gap-4">
                <item.icon size={20} className="text-cinema-gold" />
                <div className="text-left">
                  <p className="text-[11px] font-black uppercase tracking-widest">{item.label}</p>
                  <p className="text-[9px] text-zinc-500 font-bold">{item.count} Items</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-zinc-700 group-hover:text-cinema-gold group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </section>

        {/* 3. ACCOUNT SETTINGS (Email / Password) */}
        <section className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">Security & Credentials</h3>
          <div className="bg-white/2 border border-white/5 rounded-sm divide-y divide-white/5">
            {/* Email Change */}
            <div className="flex items-center justify-between p-6 group cursor-pointer hover:bg-white/1">
              <div className="flex items-center gap-6">
                <Mail size={20} className="text-zinc-500" />
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Email Address</p>
                  <p className="text-sm font-bold mt-1">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-cinema-gold hover:underline">Change</button>
            </div>

            {/* Password Change */}
            <div className="flex items-center justify-between p-6 group cursor-pointer hover:bg-white/1">
              <div className="flex items-center gap-6">
                <Lock size={20} className="text-zinc-500" />
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Security</p>
                  <p className="text-sm font-bold mt-1">••••••••••••</p>
                </div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-cinema-gold hover:underline">Update Password</button>
            </div>
          </div>
        </section>

        {/* 4. DANGER ZONE */}
        <div className="pt-8">
          <button 
            onClick={logout}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-12 py-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-sm font-black text-[10px] uppercase tracking-[0.3em] hover:bg-rose-500 hover:text-white transition-all"
          >
            <LogOut size={16} />
            Terminate Session
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;