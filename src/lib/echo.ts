import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}
Pusher.logToConsole = true;
window.Pusher = Pusher;

function apiBase(): string {
  return (
    import.meta.env.VITE_API_BASE_URL ||
    `http://${window.location.hostname}:8000/api`
  );
}

export function createEcho(token: string): Echo<'reverb'> {
  const scheme = import.meta.env.VITE_REVERB_SCHEME ?? 'http';
  const port = Number(import.meta.env.VITE_REVERB_PORT ?? 8080);
  const key = import.meta.env.VITE_REVERB_APP_KEY;
  if (!key) {
    throw new Error('VITE_REVERB_APP_KEY is not set');
  }

  return new Echo({
    broadcaster: 'reverb',
    key,
    wsHost: import.meta.env.VITE_REVERB_HOST || window.location.hostname,
    wsPort: port,
    wssPort: port,
    forceTLS: scheme === 'https',
    enabledTransports: ['ws', 'wss'],
    cluster: '',
    authEndpoint: `${apiBase()}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  });
}
