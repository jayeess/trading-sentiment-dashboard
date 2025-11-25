'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DashboardState } from '@/lib/types';

interface DashboardContextType extends DashboardState {
  setSelectedStocks: (stocks: string[]) => void;
  addStock: (stock: string) => void;
  removeStock: (stock: string) => void;
  setRefreshInterval: (interval: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setTimeRange: (range: '1H' | '4H' | '1D' | '1W') => void;
  toggleTheme: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const DEFAULT_STATE: DashboardState = {
  selectedStocks: ['AAPL'],
  refreshInterval: 30000, // 30 seconds
  theme: 'light',
  timeRange: '1D',
};

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DashboardState>(DEFAULT_STATE);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('dashboardState');
      if (savedState) {
        try {
          setState(JSON.parse(savedState));
        } catch (error) {
          console.error('Failed to parse saved dashboard state:', error);
        }
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboardState', JSON.stringify(state));
    }
  }, [state]);

  // Apply theme to document
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (state.theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [state.theme]);

  const setSelectedStocks = (stocks: string[]) => {
    setState(prev => ({ ...prev, selectedStocks: stocks }));
  };

  const addStock = (stock: string) => {
    setState(prev => {
      if (!prev.selectedStocks.includes(stock)) {
        return { ...prev, selectedStocks: [...prev.selectedStocks, stock] };
      }
      return prev;
    });
  };

  const removeStock = (stock: string) => {
    setState(prev => ({
      ...prev,
      selectedStocks: prev.selectedStocks.filter(s => s !== stock),
    }));
  };

  const setRefreshInterval = (interval: number) => {
    setState(prev => ({ ...prev, refreshInterval: interval }));
  };

  const setTheme = (theme: 'light' | 'dark') => {
    setState(prev => ({ ...prev, theme }));
  };

  const setTimeRange = (range: '1H' | '4H' | '1D' | '1W') => {
    setState(prev => ({ ...prev, timeRange: range }));
  };

  const toggleTheme = () => {
    setState(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  const value: DashboardContextType = {
    ...state,
    setSelectedStocks,
    addStock,
    removeStock,
    setRefreshInterval,
    setTheme,
    setTimeRange,
    toggleTheme,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
