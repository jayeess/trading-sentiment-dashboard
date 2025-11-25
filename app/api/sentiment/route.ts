import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { SentimentData, SentimentType, ApiResponse } from '@/lib/types';

/**
 * Sentiment Analysis API Route
 * Analyzes sentiment of stock-related text using OpenAI
 * POST /api/sentiment
 * Body: { symbol: string, text: string }
 */

// Mock sentiment generator for development
function generateMockSentiment(symbol: string, text: string): SentimentData {
  const sentiments: SentimentType[] = ['positive', 'negative', 'neutral'];
  const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

  const scoreMap = {
    positive: Math.random() * 0.5 + 0.5, // 0.5 to 1
    negative: Math.random() * -0.5 - 0.5, // -0.5 to -1
    neutral: (Math.random() - 0.5) * 0.4, // -0.2 to 0.2
  };

  return {
    symbol,
    sentiment: randomSentiment,
    score: Number(scoreMap[randomSentiment].toFixed(2)),
    confidence: Number((Math.random() * 0.3 + 0.7).toFixed(2)), // 0.7 to 1
    summary: `Mock analysis: ${randomSentiment} sentiment detected for ${symbol}`,
    timestamp: new Date().toISOString(),
  };
}

// Real OpenAI sentiment analysis
async function analyzeSentimentWithOpenAI(
  symbol: string,
  text: string
): Promise<SentimentData> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const openai = new OpenAI({ apiKey });

  const prompt = `Analyze the sentiment of the following text about ${symbol} stock.
Provide:
1. Overall sentiment (positive/negative/neutral)
2. Sentiment score (-1 to 1, where -1 is very negative, 0 is neutral, 1 is very positive)
3. Confidence level (0 to 1)
4. Brief summary (max 50 words)

Text: "${text}"

Respond in JSON format:
{
  "sentiment": "positive|negative|neutral",
  "score": <number between -1 and 1>,
  "confidence": <number between 0 and 1>,
  "summary": "<brief summary>"
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a financial sentiment analysis expert. Analyze stock-related text and provide sentiment scores.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 200,
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  const result = JSON.parse(content);

  return {
    symbol,
    sentiment: result.sentiment as SentimentType,
    score: Number(result.score.toFixed(2)),
    confidence: Number(result.confidence.toFixed(2)),
    summary: result.summary,
    timestamp: new Date().toISOString(),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, text } = body;

    if (!symbol || !text) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Symbol and text are required' },
        { status: 400 }
      );
    }

    let sentimentData: SentimentData;

    try {
      if (process.env.OPENAI_API_KEY) {
        sentimentData = await analyzeSentimentWithOpenAI(symbol, text);
      } else {
        console.log('OpenAI API key not configured, using mock data');
        sentimentData = generateMockSentiment(symbol, text);
      }
    } catch (apiError) {
      console.error('OpenAI API error, falling back to mock data:', apiError);
      sentimentData = generateMockSentiment(symbol, text);
    }

    return NextResponse.json<ApiResponse<SentimentData>>(
      { success: true, data: sentimentData },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('Sentiment analysis API error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}
