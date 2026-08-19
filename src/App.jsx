import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { useThemeSync } from './hooks/useTheme';
import AppBootstrap from './components/common/AppBootstrap/AppBootstrap';

function ThemeSync() {
  useThemeSync();
  return null;
}

function App() {
  return (
    <>
      <ThemeSync />
      <AppBootstrap />
      <AppRoutes />
    </>
  );
}

export default App;
