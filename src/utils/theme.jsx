export const THEME_STORAGE_KEY = 'mediconnect-theme';

export const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'dark' ? 'dark' : 'light';
};

export const applyThemeToDocument = (theme) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
};

export const persistTheme = (theme) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const initThemeFromStorage = () => {
  const theme = getStoredTheme();
  applyThemeToDocument(theme);
  return theme;
};
