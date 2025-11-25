import { NextRequest, NextResponse } from 'next/server';
import { NewsItem, ApiResponse } from '@/lib/types';

/**
 * News Feed API Route
 * Fetches latest financial news for selected stocks
 * GET /api/news?symbol=AAPL
 */

// Mock news generator for development
function generateMockNews(symbol: string): NewsItem[] {
  const headlines = [
    `${symbol} Reports Strong Quarterly Earnings, Beats Expectations`,
    `Analysts Upgrade ${symbol} Stock to "Buy" Rating`,
    `${symbol} Announces New Product Launch Next Quarter`,
    `Market Volatility Impacts ${symbol} Stock Performance`,
    `${symbol} CEO Discusses Future Growth Strategy`,
    `Investors Show Confidence in ${symbol}'s Long-term Vision`,
    `${symbol} Faces Regulatory Challenges in Key Markets`,
    `Technical Analysis: ${symbol} Shows Bullish Momentum`,
    `${symbol} Reports Record Revenue for Fiscal Year`,
    `Institutional Investors Increase ${symbol} Holdings`,
  ];

  const sources = [
    'Bloomberg',
    'Reuters',
    'CNBC',
    'Financial Times',
    'Wall Street Journal',
    'MarketWatch',
  ];

  return headlines.slice(0, 6).map((headline, index) => ({
    id: `news-${symbol}-${Date.now()}-${index}`,
    headline: headline,
    source: sources[index % sources.length],
    url: `https://example.com/news/${symbol.toLowerCase()}/${index}`,
    timestamp: new Date(Date.now() - index * 3600000).toISOString(), // Hourly intervals
    sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as any,
  }));
}

// Real Finnhub News API implementation
async function fetchNewsFromFinnhub(symbol: string): Promise<NewsItem[]> {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    throw new Error('Finnhub API key not configured');
  }

  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const fromDate = weekAgo.toISOString().split('T')[0];
  const toDate = today.toISOString().split('T')[0];

  const response = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${apiKey}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news from Finnhub');
  }

  const data = await response.json();

  return data.slice(0, 10).map((item: any, index: number) => ({
    id: `${symbol}-${item.id || index}`,
    headline: item.headline,
    source: item.source,
    url: item.url,
    timestamp: new Date(item.datetime * 1000).toISOString(),
    summary: item.summary,
  }));
}

// Real News API implementation (newsapi.org)
async function fetchNewsFromNewsAPI(symbol: string): Promise<NewsItem[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    throw new Error('News API key not configured');
  }

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${symbol}&sortBy=publishedAt&apiKey=${apiKey}&pageSize=10`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news from NewsAPI');
  }

  const data = await response.json();

  return data.articles.map((article: any, index: number) => ({
    id: `${symbol}-${Date.now()}-${index}`,
    headline: article.title,
    source: article.source.name,
    url: article.url,
    timestamp: article.publishedAt,
    summary: article.description,
  }));
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

    let newsItems: NewsItem[];

    try {
      if (process.env.FINNHUB_API_KEY) {
        newsItems = await fetchNewsFromFinnhub(symbol.toUpperCase());
      } else if (process.env.NEWS_API_KEY) {
        newsItems = await fetchNewsFromNewsAPI(symbol);
      } else {
        console.log('No news API keys configured, using mock data');
        newsItems = generateMockNews(symbol.toUpperCase());
      }
    } catch (apiError) {
      console.error('News API fetch error, falling back to mock data:', apiError);
      newsItems = generateMockNews(symbol.toUpperCase());
    }

    return NextResponse.json<ApiResponse<NewsItem[]>>(
      { success: true, data: newsItems },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}
