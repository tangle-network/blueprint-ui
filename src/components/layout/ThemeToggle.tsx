import { useThemeValue } from '../../hooks/useThemeValue';
import { toggleTheme } from '../../stores/theme';
import { Button } from '../ui/button';

export function ThemeToggle() {
  const theme = useThemeValue();
  return (
    <Button variant="ghost" size="icon-sm" onClick={toggleTheme} aria-label="Toggle theme" className="relative overflow-hidden">
      <div className="transition-transform duration-300 ease-out">
        {theme === 'dark' ? (
          <div className="i-ph:sun size-4 text-amber-400" />
        ) : (
          <div className="i-ph:moon size-4 text-violet-400" />
        )}
      </div>
    </Button>
  );
}
