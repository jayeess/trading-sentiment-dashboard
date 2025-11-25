'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/context/DashboardContext';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Clock } from 'lucide-react';
import { SentimentHistoryPoint } from '@/lib/types';
import { format } from 'date-fns';

interface SentimentChartProps {
  data?: SentimentHistoryPoint[];
  symbol: string;
  isLoading?: boolean;
}

// Generate mock historical data for demonstration
function generateMockHistoryData(hours: number): SentimentHistoryPoint[] {
  const data: SentimentHistoryPoint[] = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const score = (Math.random() - 0.5) * 2; // -1 to 1
    const sentiment = score > 0.2 ? 'positive' : score < -0.2 ? 'negative' : 'neutral';

    data.push({
      timestamp: timestamp.toISOString(),
      score: Number(score.toFixed(2)),
      sentiment: sentiment as any,
    });
  }

  return data;
}

export default function SentimentChart({
  data,
  symbol,
  isLoading = false
}: SentimentChartProps) {
  const { timeRange, setTimeRange } = useDashboard();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Convert time range to hours
  const timeRangeHours = useMemo(() => {
    switch (timeRange) {
      case '1H': return 1;
      case '4H': return 4;
      case '1D': return 24;
      case '1W': return 168;
      default: return 24;
    }
  }, [timeRange]);

  // Use provided data or generate mock data
  const chartData = useMemo(() => {
    // Prevent hydration mismatch by only generating random data on client
    if (!isMounted && !data) {
      return [];
    }

    const historicalData = data || generateMockHistoryData(timeRangeHours);

    return historicalData.map(point => ({
      time: format(new Date(point.timestamp), 'HH:mm'),
      score: point.score,
      sentiment: point.sentiment,
    }));
  }, [data, timeRangeHours, isMounted]);

  // Calculate average sentiment
  const averageSentiment = useMemo(() => {
    if (chartData.length === 0) return 0;
    const sum = chartData.reduce((acc, point) => acc + point.score, 0);
    return Number((sum / chartData.length).toFixed(2));
  }, [chartData]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{data.time}</p>
          <p className="text-sm">
            Score: <span className={data.score > 0 ? 'text-green-500' : 'text-red-500'}>
              {data.score}
            </span>
          </p>
          <p className="text-sm capitalize">Sentiment: {data.sentiment}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sentiment Trend - {symbol}
            </CardTitle>
            <CardDescription>
              Average: <span className={averageSentiment > 0 ? 'text-green-500' : 'text-red-500'}>
                {averageSentiment > 0 ? '+' : ''}{averageSentiment}
              </span>
            </CardDescription>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            {(['1H', '4H', '1D', '1W'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="h-8 px-3"
                aria-label={`Set time range to ${range}`}
              >
                <Clock className="h-3 w-3 mr-1" />
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading chart data...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="50%" stopColor="#eab308" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="time"
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                domain={[-1, 1]}
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="score"
                name="Sentiment Score"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#sentimentGradient)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
