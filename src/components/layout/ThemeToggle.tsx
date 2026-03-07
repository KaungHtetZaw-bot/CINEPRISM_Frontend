import { Sun, Moon, Sparkles } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore ';

interface ThemeToggleProps {
  showLabel?: boolean;
}

const ThemeToggle = ({ showLabel = true }: ThemeToggleProps) => {
  const { theme, cycleTheme } = useThemeStore();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <Sun
            size={18}
            strokeWidth={1.5}
            className="text-accent"
          />
        );
      case 'cinema':
        return (
          <Sparkles
            size={18}
            strokeWidth={1.5}
            className="text-accent drop-shadow-[0_0_8px_var(--accent-soft)]"
          />
        );
      default:
        return (
          <Moon
            size={18}
            strokeWidth={1.5}
            className="text-dim group-hover:text-main transition-colors"
          />
        );
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'cinema':
        return 'Cinema Mode';
      default:
        return 'Dark Mode';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className={`
        relative flex items-center transition-all duration-300 rounded-xl
        hover:bg-surface-2 active:scale-[0.97] group
        ${showLabel ? 'p-3.5 gap-3 w-full' : 'w-10 h-10 justify-center'}
      `}
      aria-label="Toggle Theme"
    >
      <div className="shrink-0 transition-transform duration-300 group-active:rotate-12">
        {getIcon()}
      </div>

      {showLabel && (
        <span className="
          text-[10px] font-black uppercase tracking-[0.2em]
          text-dim group-hover:text-main
          transition-colors whitespace-nowrap
        ">
          {getLabel()}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;