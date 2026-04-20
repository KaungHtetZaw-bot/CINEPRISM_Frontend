import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createEcho } from '../lib/echo';
import type { User } from '../store/useAuthStore';
import { useAuthStore } from '../store/useAuthStore';

/**
 * Subscribes the logged-in customer to purchase approve/reject broadcasts (Laravel Reverb).
 * No-ops if Reverb env is missing.
 */
export function usePurchaseBroadcast() {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    if (!token || !user?.id || !import.meta.env.VITE_REVERB_APP_KEY) {
      return;
    }

    let echoInstance: ReturnType<typeof createEcho>;

    try {
      echoInstance = createEcho(token);
      (window as any).Echo = echoInstance; // Now it will show in console
    } catch (e) {
      console.error('Echo init failed:', e);
      return;
    }

    const channelName = `App.Models.User.${user.id}`;
    // Use echoInstance here, not "echo"
    const channel = echoInstance.private(channelName);

    // Note: Make sure your Laravel Event uses these exact dot-names
    channel.listen('.purchase.approved', (payload: { user: User; purchase_id: number }) => {
      console.log('Event received: Approved', payload);
      if (payload?.user) setUser(payload.user);

      queryClient.invalidateQueries({ queryKey: ['purchases'] });
    });

    channel.listen('.purchase.rejected', () => {
      console.log('Event received: Rejected');
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
    });

    return () => {
      console.log("Cleaning up Echo connection...");
      echoInstance.disconnect();
      (window as any).Echo = undefined;
    };
  }, [token, user?.id, setUser, queryClient]);
}
