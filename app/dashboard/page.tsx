'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '@/context/DashboardContext';
import { useMarketData } from '@/lib/hooks/useMarketData';
import { useNews } from '@/lib/hooks/useNews';
import StockSelector from '@/components/dashboard/StockSelector';
import MarketOverview from '@/components/dashboard/MarketOverview';
import SentimentChart from '@/components/dashboard/SentimentChart';
import NewsPanel from '@/components/dashboard/NewsPanel';
import RealTimeIndicator from '@/components/dashboard/RealTimeIndicator';
import AIInsights from '@/components/dashboard/AIInsights';
import SmartMetrics from '@/components/dashboard/SmartMetrics';
import FloatingIcons from '@/components/effects/FloatingIcons';
import ThemeToggle from '@/components/ThemeToggle';
import { TrendingUp, Cpu } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { selectedStocks, refreshInterval } = useDashboard();
  const [isLiveUpdates, setIsLiveUpdates] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Generate stable processing particles on client only
  const processingParticles = React.useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 15 + i * 10,
      top: 20 + Math.random() * 60,
    }));
  }, [isMounted]);

  // Track mouse position for interactive background
  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Get the first selected stock (for simplicity, you can expand to handle multiple)
  const primaryStock = selectedStocks[0] || 'AAPL';

  // Fetch market data with auto-refetch
  const {
    data: marketData,
    isLoading: isLoadingMarket,
    error: marketError,
  } = useMarketData(primaryStock, isLiveUpdates ? refreshInterval : undefined);

  // Fetch news data
  const {
    data: newsData,
    isLoading: isLoadingNews,
    error: newsError,
  } = useNews(primaryStock, isLiveUpdates ? refreshInterval * 2 : undefined);

  // Update last update time when data changes
  React.useEffect(() => {
    if (marketData) {
      setLastUpdate(new Date());
    }
  }, [marketData]);

  // Show error toasts
  React.useEffect(() => {
    if (marketError) {
      toast.error(`Failed to fetch market data: ${marketError.message}`);
    }
  }, [marketError]);

  React.useEffect(() => {
    if (newsError) {
      toast.error(`Failed to fetch news: ${newsError.message}`);
    }
  }, [newsError]);

  // Show success toast when stock is selected
  React.useEffect(() => {
    if (selectedStocks.length > 0) {
      toast.success(`Tracking ${selectedStocks.length} stock${selectedStocks.length > 1 ? 's' : ''}`);
    }
  }, [selectedStocks.length]);

  const handleToggleLive = () => {
    setIsLiveUpdates(prev => {
      const newValue = !prev;
      toast.info(newValue ? 'Live updates enabled' : 'Live updates paused');
      return newValue;
    });
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Futuristic AI Trading Background */}
      <div className="fixed inset-0 -z-10">
        {/* Subtle gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Floating Trading Icons */}
        <FloatingIcons count={15} />

        {/* Glowing orbs - MUCH MORE VISIBLE */}
        <motion.div
          className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full opacity-75 dark:opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 1) 0%, rgba(99, 102, 241, 0.6) 30%, rgba(99, 102, 241, 0.3) 50%, transparent 70%)',
            filter: 'blur(35px)',
            boxShadow: '0 0 150px rgba(99, 102, 241, 0.8), 0 0 250px rgba(99, 102, 241, 0.5)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute -bottom-40 -left-40 w-[800px] h-[800px] rounded-full opacity-75 dark:opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 1) 0%, rgba(168, 85, 247, 0.6) 30%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)',
            filter: 'blur(35px)',
            boxShadow: '0 0 150px rgba(168, 85, 247, 0.8), 0 0 250px rgba(168, 85, 247, 0.5)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Interactive cursor glow - MORE VISIBLE */}
        <motion.div
          className="pointer-events-none absolute w-[450px] h-[450px] rounded-full opacity-40 dark:opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(99, 102, 241, 0.4) 50%, transparent 70%)',
            filter: 'blur(35px)',
          }}
          animate={{
            x: mousePosition.x - 225,
            y: mousePosition.y - 225,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        />

        {/* AI Processing Particles - MUCH MORE VISIBLE */}
        {processingParticles.map((particle, i) => (
          <motion.div
            key={particle.id}
            className="absolute w-8 h-8 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: 'radial-gradient(circle, #3b82f6 0%, #60a5fa 40%, #3b82f6 100%)',
              boxShadow: `
                0 0 30px rgba(59, 130, 246, 1),
                0 0 60px rgba(59, 130, 246, 1),
                0 0 90px rgba(59, 130, 246, 0.8),
                0 0 120px rgba(59, 130, 246, 0.6)
              `,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 1, 1, 1, 0],
              scale: [0, 5, 5, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative border-b bg-card/50 sticky top-0 z-50 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Trading Sentiment Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Real-time market analysis
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-32 custom-scrollbar">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Real-time Indicator */}
          <RealTimeIndicator
            isLive={isLiveUpdates}
            onToggleLive={handleToggleLive}
            lastUpdate={lastUpdate}
            isLoading={isLoadingMarket}
          />

          {/* Stock Selector */}
          <StockSelector />

          {/* Smart Metrics - NEW */}
          <section>
            <motion.h2
              className="text-xl font-semibold mb-4 heading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Key Metrics
            </motion.h2>
            <SmartMetrics isLoading={isLoadingMarket} />
          </section>

          {/* Two Column Layout for Charts and AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Market Overview Cards */}
              <section>
                <motion.h2
                  className="text-xl font-semibold mb-4 heading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Market Overview
                </motion.h2>
                <MarketOverview
                  data={marketData}
                  isLoading={isLoadingMarket}
                />
              </section>

              {/* Sentiment Chart */}
              <section>
                <motion.h2
                  className="text-xl font-semibold mb-4 heading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Sentiment Analysis
                </motion.h2>
                <SentimentChart
                  symbol={primaryStock}
                  isLoading={isLoadingMarket}
                />
              </section>
            </div>

            {/* AI Insights Sidebar - NEW */}
            <div className="lg:col-span-1">
              <motion.h2
                className="text-xl font-semibold mb-4 heading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                Smart Insights
              </motion.h2>
              <AIInsights symbol={primaryStock} isLoading={isLoadingMarket} />
            </div>
          </div>

          {/* News Panel - Full Width */}
          <section>
            <motion.h2
              className="text-xl font-semibold mb-4 heading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Latest News & Updates
            </motion.h2>
            <NewsPanel
              data={newsData}
              isLoading={isLoadingNews}
              symbol={primaryStock}
            />
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Built with Next.js, React Query, and OpenAI</p>
        </div>
      </footer>
    </div>
  );
}
