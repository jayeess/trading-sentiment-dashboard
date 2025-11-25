'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StockData } from '@/lib/types';
import { ArrowUp, ArrowDown, TrendingUp, DollarSign, Activity } from 'lucide-react';

interface MarketOverviewProps {
  data?: StockData;
  isLoading?: boolean;
}

export default function MarketOverview({ data, isLoading = false }: MarketOverviewProps) {
  const [animatedPrice, setAnimatedPrice] = useState(data?.price || 0);

  // Animate price changes
  useEffect(() => {
    if (data?.price) {
      const duration = 1000;
      const steps = 20;
      const stepDuration = duration / steps;
      const priceDiff = data.price - animatedPrice;
      const priceStep = priceDiff / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setAnimatedPrice(prev => prev + priceStep);

        if (currentStep >= steps) {
          setAnimatedPrice(data.price);
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [data?.price]);

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Skeleton className="h-4 w-20" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-24 mb-2" />
          <Skeleton className="h-4 w-16" />
        </CardContent>
      </Card>
    );
  }

  const isPositive = data.change >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Price Card */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {data.symbol} Price
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${animatedPrice.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time price
          </p>
        </CardContent>
      </Card>

      {/* Change Card */}
      <Card className={`hover:shadow-lg transition-shadow ${isPositive ? 'border-green-500/20' : 'border-red-500/20'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Price Change
          </CardTitle>
          {isPositive ? (
            <ArrowUp className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{data.change.toFixed(2)}
          </div>
          <p className={`text-xs mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%
          </p>
        </CardContent>
      </Card>

      {/* Volume Card */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Volume
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(data.volume / 1000000).toFixed(2)}M
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Trading volume
          </p>
        </CardContent>
      </Card>

      {/* Trend Card */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Trend
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? 'Bullish' : 'Bearish'}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on price movement
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
