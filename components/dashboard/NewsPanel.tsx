'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { NewsItem } from '@/lib/types';
import { Newspaper, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NewsPanelProps {
  data?: NewsItem[];
  isLoading?: boolean;
  symbol: string;
}

function NewsItemCard({ item }: { item: NewsItem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'positive';
      case 'negative': return 'negative';
      case 'neutral': return 'neutral';
      default: return 'secondary';
    }
  };

  return (
    <div className="border-b last:border-0 pb-4 last:pb-0">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-sm leading-tight flex-1 hover:text-primary transition-colors cursor-pointer">
            {item.headline}
          </h4>
          {item.sentiment && (
            <Badge variant={getSentimentColor(item.sentiment) as any} className="shrink-0">
              {item.sentiment}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">{item.source}</span>
          <span>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
        </div>

        {item.summary && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
              aria-expanded={isExpanded}
              aria-label="Toggle article summary"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  Hide summary
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  Show summary
                </>
              )}
            </button>

            {isExpanded && (
              <p className="text-sm text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 duration-200">
                {item.summary}
              </p>
            )}
          </>
        )}

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          aria-label="Read full article"
        >
          Read full article
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

export default function NewsPanel({ data, isLoading = false, symbol }: NewsPanelProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Latest News - {symbol}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          Latest News - {symbol}
        </CardTitle>
        <CardDescription>
          {data && data.length > 0
            ? `${data.length} recent ${data.length === 1 ? 'article' : 'articles'}`
            : 'No news available'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {data.map((item) => (
              <NewsItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <Newspaper className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No news articles available for {symbol}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
