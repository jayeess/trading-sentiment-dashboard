// Stock data types
export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: string;
}

// Sentiment analysis types
export type SentimentType = 'positive' | 'negative' | 'neutral';

export interface SentimentData {
  symbol: string;
  sentiment: SentimentType;
  score: number; // -1 to 1
  confidence: number; // 0 to 1
  summary: string;
  timestamp: string;
}

export interface SentimentHistoryPoint {
  timestamp: string;
  score: number;
  sentiment: SentimentType;
}

// News types
export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  url: string;
  timestamp: string;
  sentiment?: SentimentType;
  summary?: string;
}

// Dashboard context types
export interface DashboardState {
  selectedStocks: string[];
  refreshInterval: number;
  theme: 'light' | 'dark';
  timeRange: '1H' | '4H' | '1D' | '1W';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Chart data types
export interface ChartDataPoint {
  timestamp: string;
  value: number;
  label?: string;
}
