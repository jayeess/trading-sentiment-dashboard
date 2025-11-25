'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, BarChart3 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Metric {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: typeof TrendingUp;
  sparklineData: { value: number }[];
  color: string;
}

interface SmartMetricsProps {
  isLoading?: boolean;
}

export default function SmartMetrics({ isLoading }: SmartMetricsProps) {
  // Mock sparkline data
  const generateSparklineData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      value: Math.random() * 100 + 50,
    }));
  };

  const metrics: Metric[] = [
    {
      id: 'price',
      label: 'Current Price',
      value: '$187.42',
      change: 5.2,
      changeLabel: 'vs last hour',
      icon: DollarSign,
      sparklineData: generateSparklineData(),
      color: '#3b82f6',
    },
    {
      id: 'volume',
      label: 'Trading Volume',
      value: '2.4M',
      change: -2.1,
      changeLabel: 'vs yesterday',
      icon: Activity,
      sparklineData: generateSparklineData(),
      color: '#8b5cf6',
    },
    {
      id: 'sentiment',
      label: 'Market Sentiment',
      value: '85%',
      change: 12.5,
      changeLabel: 'bullish',
      icon: TrendingUp,
      sparklineData: generateSparklineData(),
      color: '#10b981',
    },
    {
      id: 'mentions',
      label: 'Social Mentions',
      value: '15.2K',
      change: 8.3,
      changeLabel: 'last 24h',
      icon: Users,
      sparklineData: generateSparklineData(),
      color: '#f59e0b',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6">
            <div className="space-y-4">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-8 w-32 bg-muted animate-pulse rounded" />
              <div className="h-12 bg-muted animate-pulse rounded" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.change > 0;

        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 card-modern group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <motion.h3
                    className="text-3xl font-bold heading-tight"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    {metric.value}
                  </motion.h3>
                </div>
                <div
                  className="p-3 rounded-lg transition-all group-hover:scale-110"
                  style={{
                    backgroundColor: `${metric.color}20`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: metric.color }} />
                </div>
              </div>

              {/* Sparkline Chart */}
              <div className="h-12 mb-3 -mx-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.sparklineData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={metric.color}
                      strokeWidth={2}
                      dot={false}
                      animationDuration={1000}
                      animationBegin={index * 100}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Change Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      isPositive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {metric.change}%
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{metric.changeLabel}</span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
