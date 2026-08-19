import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applyThemeToDocument, persistTheme } from '../utils/theme';

export const useThemeSync = () => {
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    applyThemeToDocument(theme);
    persistTheme(theme);
  }, [theme]);

  return theme;
};

export const selectTheme = (state) => state.ui.theme;
