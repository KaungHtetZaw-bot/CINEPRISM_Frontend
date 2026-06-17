import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'dark' | 'light' | 'cinema';

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;

  root.removeAttribute('data-theme');

  if (theme !== 'dark') {
    root.setAttribute('data-theme', theme);
  }
};

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',

      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },

      cycleTheme: () => {
        const order: Theme[] = ['dark', 'light', 'cinema'];
        const currentIndex = order.indexOf(get().theme);
        const nextTheme = order[(currentIndex + 1) % order.length];

        applyTheme(nextTheme);
        set({ theme: nextTheme });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyTheme(state.theme);
      },
    }
  )
);