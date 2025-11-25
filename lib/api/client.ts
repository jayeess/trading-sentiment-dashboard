import axios from 'axios';
import { StockData, SentimentData, NewsItem, ApiResponse } from '@/lib/types';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Market Data API
export async function fetchMarketData(symbol: string): Promise<StockData> {
  const response = await apiClient.get<ApiResponse<StockData>>(
    `/market-data?symbol=${symbol}`
  );

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to fetch market data');
  }

  return response.data.data;
}

// Sentiment Analysis API
export async function analyzeSentiment(
  symbol: string,
  text: string
): Promise<SentimentData> {
  const response = await apiClient.post<ApiResponse<SentimentData>>('/sentiment', {
    symbol,
    text,
  });

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to analyze sentiment');
  }

  return response.data.data;
}

// News API
export async function fetchNews(symbol: string): Promise<NewsItem[]> {
  const response = await apiClient.get<ApiResponse<NewsItem[]>>(
    `/news?symbol=${symbol}`
  );

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to fetch news');
  }

  return response.data.data;
}

export default apiClient;
