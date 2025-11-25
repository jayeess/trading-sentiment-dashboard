'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Circle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RealTimeIndicatorProps {
  isLive: boolean;
  onToggleLive: () => void;
  lastUpdate?: Date;
  isLoading?: boolean;
}

export default function RealTimeIndicator({
  isLive,
  onToggleLive,
  lastUpdate,
  isLoading = false
}: RealTimeIndicatorProps) {
  const [formattedTime, setFormattedTime] = useState('');

  // Update the formatted time every second
  useEffect(() => {
    if (lastUpdate) {
      const updateTime = () => {
        setFormattedTime(formatDistanceToNow(lastUpdate, { addSuffix: true }));
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }
  }, [lastUpdate]);

  return (
    <div className="flex items-center gap-4 p-4 bg-card border rounded-lg shadow-sm">
      {/* Live Status Indicator */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Circle
            className={`h-3 w-3 ${isLive ? 'fill-green-500 text-green-500' : 'fill-muted text-muted'}`}
          />
          {isLive && (
            <Circle
              className="absolute top-0 left-0 h-3 w-3 text-green-500 animate-ping"
            />
          )}
        </div>
        <span className="text-sm font-medium">
          {isLive ? 'Live' : 'Paused'}
        </span>
      </div>

      {/* Last Update Time */}
      {lastUpdate && (
        <div className="text-sm text-muted-foreground">
          Last updated {formattedTime}
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <RefreshCw className="h-3 w-3 animate-spin" />
          Updating...
        </div>
      )}

      {/* Toggle Button */}
      <Button
        variant={isLive ? 'destructive' : 'default'}
        size="sm"
        onClick={onToggleLive}
        className="ml-auto"
        aria-label={isLive ? 'Pause updates' : 'Resume updates'}
      >
        {isLive ? (
          <>
            <Circle className="h-3 w-3 mr-2 fill-current" />
            Pause Updates
          </>
        ) : (
          <>
            <RefreshCw className="h-3 w-3 mr-2" />
            Resume Updates
          </>
        )}
      </Button>
    </div>
  );
}
