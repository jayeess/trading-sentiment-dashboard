'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchMarketData } from '@/lib/api/client';
import { StockData } from '@/lib/types';

/**
 * Custom hook to fetch market data for a stock symbol
 * Uses React Query for caching and automatic refetching
 */
export function useMarketData(
  symbol: string,
  refetchInterval: number = 30000
): UseQueryResult<StockData, Error> {
  return useQuery({
    queryKey: ['marketData', symbol],
    queryFn: () => fetchMarketData(symbol),
    refetchInterval,
    staleTime: 10000, // Data considered fresh for 10 seconds
    enabled: Boolean(symbol),
    retry: 2,
  });
}
