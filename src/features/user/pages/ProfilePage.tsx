import { useEffect, useState } from 'react';
import {
  LogOut, User, Mail, ShieldCheck,
  Clock, Bookmark, Heart, ChevronRight,
  Edit3, KeyRound, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import api from '../../../app/api/axios';
import { useAuthStore } from '../../auth/store/useAuthStore';

type ActiveModal = null | 'name' | 'email' | 'password';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const queryClient = useQueryClient();

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const isVip = !!user?.is_vip && (!user?.vip_expires_at || new Date(user.vip_expires_at) > new Date());

  useEffect(() => {
    if (activeModal) {
      setSaveError(null);
    }
  }, [activeModal]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !activeModal || isSaving) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      if (activeModal === 'password') {
        await api.patch(`/users/${user.id}/change-password`, {
          password: formData.password,
          password_confirmation: formData.password,
        });
      } else {
        await api.patch(`/users/${user.id}/change-profile`, { [activeModal]: formData[activeModal] });
        useAuthStore.setState({ user: { ...user, [activeModal]: formData[activeModal] } });
      }
      queryClient.invalidateQueries();
      setActiveModal(null);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string; errors?: string | string[] } } })?.response?.data;
      setSaveError(
        (typeof message?.errors === 'string' ? message.errors : message?.errors?.[0]) ||
          message?.message ||
          'Update failed. Please check your input.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-app text-main p-6 md:p-12 pb-24 relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center gap-6 pb-8 border-b border-border">
          <div className="w-20 h-20 bg-surface-1 border border-border flex items-center justify-center rounded-sm relative group">
            <User size={40} className="text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black uppercase tracking-tighter italic text-main">
                {user?.name || "Member"}
              </h1>
              <button
                onClick={() => setActiveModal('name')}
                aria-label="Edit name"
                className="p-1.5 hover:bg-surface-2 rounded-full text-muted hover:text-accent transition-all"
              >
                <Edit3 size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <ShieldCheck size={14} className={isVip ? 'text-accent' : 'text-muted'} />
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                {isVip ? 'VIP Member' : 'Standard Account'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-4">Your Library</h3>
            <div className="space-y-2">
              {[
                { label: 'Recently Watched', icon: Clock, path: '/mylist/recent', color: 'text-blue-400' },
                { label: 'Bookmarks', icon: Bookmark, path: '/mylist/watchlist', color: 'text-accent' },
                { label: 'Favorites', icon: Heart, path: '/mylist/favorite', color: 'text-rose-500' },
              ].map((item) => (
                <Link key={item.label} to={item.path} className="group flex items-center justify-between p-4 bg-surface-1 border border-border rounded-sm hover:border-accent transition-all">
                  <div className="flex items-center gap-4">
                    <item.icon size={18} className={item.color} />
                    <span className="text-[11px] font-black uppercase tracking-widest text-main">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-muted group-hover:text-accent transition-colors" />
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-4">Security Settings</h3>
            <div className="border border-border rounded-sm divide-y divide-border">

              <div className="bg-surface-1 p-4 mb-3 flex items-center justify-between group cursor-pointer" onClick={() => setActiveModal('email')}>
                <div className="flex items-center gap-4">
                  <Mail size={18} className="text-muted" />
                  <div>
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest">Email</p>
                    <p className="text-xs font-medium text-main">{user?.email}</p>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-accent">Change</span>
              </div>

              <div className="bg-surface-1 p-4 flex items-center justify-between group cursor-pointer" onClick={() => setActiveModal('password')}>
                <div className="flex items-center gap-4">
                  <KeyRound size={18} className="text-muted" />
                  <div>
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest">Password</p>
                    <p className="text-xs font-medium tracking-[0.3em] text-main">••••••••</p>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-accent">Update</span>
              </div>
            </div>
          </section>
        </div>

        <div className="pt-10 flex border-t border-border">
          <button onClick={logout} className="flex items-center gap-3 px-8 py-3 border border-rose-500/30 text-rose-500 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-surface-2 border border-border w-full max-w-md p-8 rounded-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase tracking-tighter italic text-main">Update {activeModal}</h2>
              <button onClick={() => setActiveModal(null)} aria-label="Close" className="text-muted hover:text-main"><X size={20} /></button>
            </div>

            {activeModal === 'email' && (
              <p className="text-xs text-muted mb-4 -mt-3 italic">
                Changing your email requires verification and your current password.
              </p>
            )}

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted">New {activeModal}</label>
                <input
                  type={activeModal === 'password' ? 'password' : activeModal === 'email' ? 'email' : 'text'}
                  autoFocus
                  className="auth-input"
                  placeholder={`Enter new ${activeModal}`}
                  value={activeModal === 'password' ? formData.password : activeModal === 'name' ? formData.name : formData.email}
                  onChange={(e) => setFormData({ ...formData, [activeModal!]: e.target.value })}
                  required
                />
              </div>

              {saveError && (
                <p className="text-xs font-bold text-rose-500">{saveError}</p>
              )}

              <button type="submit" disabled={isSaving} className="auth-btn disabled:opacity-50 disabled:pointer-events-none">
                {isSaving ? 'Saving…' : 'Confirm Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
