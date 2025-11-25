'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { analyzeSentiment } from '@/lib/api/client';
import { SentimentData } from '@/lib/types';

/**
 * Custom hook to analyze sentiment of text
 * Uses React Query mutation for manual triggering
 */
export function useSentiment(): UseMutationResult<
  SentimentData,
  Error,
  { symbol: string; text: string }
> {
  return useMutation({
    mutationFn: ({ symbol, text }) => analyzeSentiment(symbol, text),
    retry: 1,
  });
}
