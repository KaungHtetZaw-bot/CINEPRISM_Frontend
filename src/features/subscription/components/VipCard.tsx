import { useEffect, useState } from "react";
import { useAuthStore } from "../../auth/store/useAuthStore";
import { Link } from "react-router-dom";

const MAX_VIEW_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const VipCard = () => {
    const user = useAuthStore((state) => state.user);
    const [timeLeft, setTimeLeft] = useState("");
    const [progress, setProgress] = useState(0);
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        if (!user?.is_vip || !user?.vip_expires_at) return;

        const calculateTime = () => {
            const expiration = new Date(user.vip_expires_at!).getTime();
            const diff = expiration - Date.now();

            if (diff <= 0) {
                // Display-only signal; the backend enforces actual VIP expiry
                setTimeLeft("Expired");
                setProgress(0);
                setExpired(true);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${days}d ${hours}h ${mins}m ${secs}s`);
            setProgress(Math.max(0, Math.min(100, (diff / MAX_VIEW_DAYS_MS) * 100)));
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime();
        return () => clearInterval(timer);
    }, [user?.vip_expires_at, user?.is_vip]);

    const showVip = !!user?.is_vip && !expired;

    return (
        <div className="mx-4 mt-auto mb-4 p-4 rounded-2xl bg-linear-to-br from-accent/20 via-accent/5 to-transparent border border-accent/20 relative overflow-hidden group cursor-pointer">
            <Link to={showVip ? '/profile' : '/vip-purchase'}>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/5 to-transparent" />
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                        {showVip ? 'VIP Active' : 'Unlock VIP Now'}
                    </span>
                </div>
                {showVip ? (
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-end">
                            <p className="text-[11px] text-main font-mono font-bold tracking-tight">
                                {timeLeft}
                            </p>
                            <span className="text-[8px] font-black text-accent/50">
                                {Math.round(progress)}%
                            </span>
                        </div>

                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div
                                className="h-full bg-accent shadow-[0_0_12px_rgba(212,175,55,0.6)] transition-all duration-1000 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        <p className="text-[11px] text-main font-mono font-bold tracking-tight">
                            upgrade to VIP for exclusive perks!
                        </p>
                    </div>
                )}
            </Link>
        </div>
    )
}

export default VipCard
