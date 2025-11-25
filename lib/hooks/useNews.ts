'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchNews } from '@/lib/api/client';
import { NewsItem } from '@/lib/types';

/**
 * Custom hook to fetch news for a stock symbol
 * Uses React Query for caching and automatic refetching
 */
export function useNews(
  symbol: string,
  refetchInterval: number = 60000
): UseQueryResult<NewsItem[], Error> {
  return useQuery({
    queryKey: ['news', symbol],
    queryFn: () => fetchNews(symbol),
    refetchInterval,
    staleTime: 30000, // Data considered fresh for 30 seconds
    enabled: Boolean(symbol),
    retry: 2,
  });
}
