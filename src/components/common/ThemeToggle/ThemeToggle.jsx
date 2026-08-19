import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun } from 'lucide-react';
import { toggleTheme } from '../../../features/ui/uiSlice';
import { selectTheme } from '../../../hooks/useTheme';
import { cn } from '../../../utils/cn';

const ThemeToggle = ({ className = '' }) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={cn(
        'inline-grid h-[42px] w-[42px] cursor-pointer place-items-center rounded-md border-[1.5px] border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--primary-300)] hover:bg-[var(--primary-50)] hover:text-[var(--text-accent)] dark:hover:bg-[var(--gray-100)]',
        className,
      )}
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
