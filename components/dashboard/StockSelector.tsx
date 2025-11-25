'use client';

import React, { useState, useCallback } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Search } from 'lucide-react';

// Popular stock symbols
const POPULAR_STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'AMD'];

export default function StockSelector() {
  const { selectedStocks, addStock, removeStock } = useDashboard();
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Handle search input change with validation
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearchInput(value);

    // Show suggestions based on popular stocks
    if (value.length > 0) {
      const filtered = POPULAR_STOCKS.filter(
        stock => stock.includes(value) && !selectedStocks.includes(stock)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [selectedStocks]);

  // Add stock from search
  const handleAddStock = useCallback((symbol: string) => {
    if (symbol && symbol.length > 0 && !selectedStocks.includes(symbol)) {
      addStock(symbol);
      setSearchInput('');
      setSuggestions([]);
    }
  }, [addStock, selectedStocks]);

  // Handle Enter key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput) {
      handleAddStock(searchInput);
    }
  }, [searchInput, handleAddStock]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Stock Selector
        </CardTitle>
        <CardDescription>
          Search and select stocks to track sentiment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter stock symbol (e.g., AAPL)"
              value={searchInput}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              className="pr-10"
              aria-label="Stock symbol search"
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                {suggestions.map(stock => (
                  <button
                    key={stock}
                    onClick={() => handleAddStock(stock)}
                    className="w-full px-4 py-2 text-left hover:bg-accent transition-colors"
                    aria-label={`Add ${stock} to selected stocks`}
                  >
                    {stock}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button
            onClick={() => handleAddStock(searchInput)}
            disabled={!searchInput || selectedStocks.includes(searchInput)}
            size="icon"
            aria-label="Add stock"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected Stocks */}
        {selectedStocks.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Selected Stocks ({selectedStocks.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedStocks.map(stock => (
                <Badge
                  key={stock}
                  variant="secondary"
                  className="px-3 py-1.5 flex items-center gap-2 hover:bg-secondary/80 transition-colors"
                >
                  <span className="font-semibold">{stock}</span>
                  <button
                    onClick={() => removeStock(stock)}
                    className="hover:text-destructive transition-colors"
                    aria-label={`Remove ${stock}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Popular Stocks */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Popular Stocks
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_STOCKS.filter(stock => !selectedStocks.includes(stock)).map(stock => (
              <Button
                key={stock}
                variant="outline"
                size="sm"
                onClick={() => handleAddStock(stock)}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={`Add ${stock} to selected stocks`}
              >
                <Plus className="h-3 w-3 mr-1" />
                {stock}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
