import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";

const VipCard = () => { 
    const { user, setUser } = useAuthStore()
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if(user?.is_vip) {
            const timer = setInterval(calculateTime, 1000);
            calculateTime();
            calculateProgress()
            return () => clearInterval(timer);
        }
        console.log("VIP Status:", user?.is_vip, "Expires At:", user?.vip_expires_at);
    }, [user?.vip_expires_at, user?.is_vip]);

    const calculateTime = () => {
        if (!user?.vip_expires_at) return;
        const expiration = new Date(user?.vip_expires_at).getTime();
        const now = new Date().getTime();
        const diff = expiration - now;

        if (diff <= 0) {
            setTimeLeft("Expired");
            setUser({ ...user, is_vip: 0 });
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${mins}m ${secs}s`);
        console.log(`VIP expires in: ${timeLeft}`);
    };

    const calculateProgress = () => {
        if (!user?.vip_expires_at) return 0;
        
        const expiration = new Date(user.vip_expires_at).getTime();
        const now = new Date().getTime();
        const diff = expiration - now;
        const maxViewDays = 30 * 24 * 60 * 60 * 1000; 
        const percentage = Math.max(0, Math.min(100, (diff / maxViewDays) * 100));
        
        return percentage;
    };

    const progressWidth = calculateProgress();
  return (
    <div className="mx-4 mt-auto mb-4 p-4 rounded-2xl bg-linear-to-br from-accent/20 via-accent/5 to-transparent border border-accent/20 relative overflow-hidden group cursor-pointer">
       <Link to={user?.is_vip ? '/profile/subscription' : '/vip-purchase'}>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/5 to-transparent" />
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                {user?.is_vip ? 'VIP Active' : 'Unlock VIP Now'}
                </span>
                {/* {new Date(user?.vip_expires_at).getTime() - Date.now() > 31 * 24 * 60 * 60 * 1000 && (
                    <div className="flex items-center text-[8px] bg-accent text-black px-1 rounded font-bold">
                        +PLUS
                    </div>
                )} */}
            </div>
            {
                user?.is_vip ? (
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-end">
                            <p className="text-[11px] text-main font-mono font-bold tracking-tight">
                                {timeLeft}
                            </p>
                            <span className="text-[8px] font-black text-accent/50">
                                {Math.round(progressWidth)}%
                            </span>
                        </div>
                        
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div 
                                className="h-full bg-accent shadow-[0_0_12px_rgba(212,175,55,0.6)] transition-all duration-1000 ease-linear" 
                                style={{ width: `${progressWidth}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        <p className="text-[11px] text-main font-mono font-bold tracking-tight">
                            upgrade to VIP for exclusive perks! 
                        </p>
                    </div>
                )
            }
       </Link>
    </div>
  )
}

export default VipCard