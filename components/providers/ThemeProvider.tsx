'use client';

import { useEffect } from 'react';
import { useDashboard } from '@/context/DashboardContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useDashboard();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
