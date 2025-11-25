import { NextRequest, NextResponse } from 'next/server';
import { StockData, ApiResponse } from '@/lib/types';

/**
 * Market Data API Route
 * Fetches real-time stock data from Finnhub or Alpha Vantage
 * GET /api/market-data?symbol=AAPL
 */

// Mock data generator for development (replace with real API calls)
function generateMockStockData(symbol: string): StockData {
  const basePrice = {
    'AAPL': 178.50,
    'GOOGL': 142.30,
    'MSFT': 380.20,
    'TSLA': 242.80,
    'AMZN': 155.70,
  }[symbol] || 100;

  const change = (Math.random() - 0.5) * 10;
  const changePercent = (change / basePrice) * 100;

  return {
    symbol,
    price: Number((basePrice + change).toFixed(2)),
    change: Number(change.toFixed(2)),
    changePercent: Number(changePercent.toFixed(2)),
    volume: Math.floor(Math.random() * 10000000) + 1000000,
    timestamp: new Date().toISOString(),
  };
}

// Real Finnhub API implementation
async function fetchFromFinnhub(symbol: string): Promise<StockData> {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    throw new Error('Finnhub API key not configured');
  }

  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data from Finnhub');
  }

  const data = await response.json();

  return {
    symbol,
    price: data.c, // current price
    change: data.d, // change
    changePercent: data.dp, // change percent
    volume: data.v || 0, // volume
    timestamp: new Date().toISOString(),
  };
}

// Real Alpha Vantage API implementation
async function fetchFromAlphaVantage(symbol: string): Promise<StockData> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  if (!apiKey) {
    throw new Error('Alpha Vantage API key not configured');
  }

  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data from Alpha Vantage');
  }

  const data = await response.json();
  const quote = data['Global Quote'];

  if (!quote) {
    throw new Error('Invalid response from Alpha Vantage');
  }

  return {
    symbol,
    price: parseFloat(quote['05. price']),
    change: parseFloat(quote['09. change']),
    changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
    volume: parseInt(quote['06. volume']),
    timestamp: new Date().toISOString(),
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');

    if (!symbol) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Symbol parameter is required' },
        { status: 400 }
      );
    }

    // Try to use real API, fallback to mock data if not configured
    let stockData: StockData;

    try {
      if (process.env.FINNHUB_API_KEY) {
        stockData = await fetchFromFinnhub(symbol.toUpperCase());
      } else if (process.env.ALPHA_VANTAGE_API_KEY) {
        stockData = await fetchFromAlphaVantage(symbol.toUpperCase());
      } else {
        // Use mock data if no API keys are configured
        console.log('No API keys configured, using mock data');
        stockData = generateMockStockData(symbol.toUpperCase());
      }
    } catch (apiError) {
      console.error('API fetch error, falling back to mock data:', apiError);
      stockData = generateMockStockData(symbol.toUpperCase());
    }

    return NextResponse.json<ApiResponse<StockData>>(
      { success: true, data: stockData },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
        },
      }
    );
  } catch (error) {
    console.error('Market data API error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}
