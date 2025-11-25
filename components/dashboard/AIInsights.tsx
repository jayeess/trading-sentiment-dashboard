'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Brain, TrendingUp, TrendingDown, AlertCircle, Sparkles } from 'lucide-react';

interface AIInsight {
  type: 'bullish' | 'bearish' | 'neutral' | 'alert';
  title: string;
  description: string;
  confidence: number;
}

interface AIInsightsProps {
  symbol: string;
  isLoading?: boolean;
}

export default function AIInsights({ symbol, isLoading }: AIInsightsProps) {
  // Mock AI insights - in production, this would come from your AI API
  const insights: AIInsight[] = [
    {
      type: 'bullish',
      title: 'Strong Upward Momentum',
      description: `${symbol} shows consistent positive sentiment across 85% of recent news articles and social media mentions.`,
      confidence: 85,
    },
    {
      type: 'neutral',
      title: 'Trading Volume Analysis',
      description: 'Current trading volume is 15% above average, indicating increased market interest.',
      confidence: 72,
    },
    {
      type: 'alert',
      title: 'Earnings Report Soon',
      description: 'Upcoming earnings report in 3 days may cause increased volatility.',
      confidence: 95,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'bullish':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Brain className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'bullish':
        return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/30';
      case 'bearish':
        return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30';
      case 'alert':
        return 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900/30';
      default:
        return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30';
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-6 bg-muted animate-pulse rounded" />
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-lg bg-muted animate-pulse h-24" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 card-modern">
        <div className="flex items-center gap-2 mb-6">
          <div className="relative">
            <Brain className="h-6 w-6 text-primary" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-3 w-3 text-yellow-500" />
            </motion.div>
          </div>
          <h3 className="text-lg font-semibold heading-tight">AI-Powered Insights</h3>
          <span className="ml-auto text-xs text-muted-foreground">
            Updated just now
          </span>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${getBackgroundColor(insight.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getIcon(insight.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <div className="flex items-center gap-1">
                      <div className="text-xs text-muted-foreground">
                        {insight.confidence}%
                      </div>
                      <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${insight.confidence}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground body-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Powered by OpenAI GPT-3.5</span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live Analysis
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
