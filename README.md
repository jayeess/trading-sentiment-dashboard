# Trading Sentiment Dashboard

A modern, real-time trading sentiment analysis dashboard built with Next.js 14, React 18, TypeScript, and OpenAI. This project showcases advanced frontend development skills with emphasis on React patterns, API integration, and production-ready code quality.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

## Features

### Frontend Excellence
- **Modern React Architecture**: Reusable, modular components with clear separation of concerns
- **State Management**: Context API + React Query for optimal data fetching and caching
- **Real-time Updates**: Automatic data polling with configurable refresh intervals (30s default)
- **Interactive Visualizations**: Recharts-powered charts with animations and custom tooltips
- **Responsive Design**: Mobile-first approach that works seamlessly across all devices
- **Theme System**: Light/dark mode with smooth transitions and persistence
- **Type Safety**: Full TypeScript implementation with proper interfaces and type guards
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### API Integration
- **Market Data API**: Real-time stock prices from Finnhub or Alpha Vantage
- **Sentiment Analysis API**: AI-powered sentiment analysis using OpenAI GPT-3.5
- **News Feed API**: Latest financial news with automatic sentiment tagging
- **Error Handling**: Comprehensive error states with retry logic and fallback data
- **Caching Strategy**: Smart caching with React Query for optimal performance

### User Experience
- **Live Updates**: Real-time data refresh with visual indicators
- **Toast Notifications**: User-friendly feedback for all actions
- **Loading States**: Skeleton loaders for smooth perceived performance
- **Smooth Animations**: Professional transitions and micro-interactions
- **Intuitive Interface**: Clear information hierarchy and easy navigation

## Tech Stack

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **UI Library**: [React 18](https://react.dev/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context API + [React Query](https://tanstack.com/query/latest)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Date Formatting**: [date-fns](https://date-fns.org/)

### Backend (API Routes)
- **Runtime**: Next.js API Routes (serverless functions)
- **LLM**: [OpenAI API](https://openai.com/api/) for sentiment analysis
- **Market Data**: [Finnhub](https://finnhub.io/) or [Alpha Vantage](https://www.alphavantage.co/)
- **News**: Finnhub News API or [NewsAPI](https://newsapi.org/)

## Project Structure

```
trading-sentiment-dashboard/
├── app/
│   ├── api/                    # API routes (serverless functions)
│   │   ├── market-data/        # Stock price data endpoint
│   │   ├── sentiment/          # Sentiment analysis endpoint
│   │   └── news/               # News feed endpoint
│   ├── dashboard/              # Main dashboard page
│   │   └── page.tsx
│   ├── layout.tsx              # Root layout with providers
│   ├── globals.css             # Global styles
│   └── page.tsx                # Home page (redirects to dashboard)
├── components/
│   ├── dashboard/              # Dashboard-specific components
│   │   ├── StockSelector.tsx  # Stock search and selection
│   │   ├── SentimentChart.tsx # Interactive sentiment chart
│   │   ├── MarketOverview.tsx # Market data cards
│   │   ├── NewsPanel.tsx      # News feed with sentiment badges
│   │   └── RealTimeIndicator.tsx # Live update indicator
│   ├── providers/              # React providers
│   │   └── QueryProvider.tsx  # React Query provider
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── skeleton.tsx
│   │   └── toaster.tsx
│   └── ThemeToggle.tsx         # Theme switcher component
├── context/
│   └── DashboardContext.tsx    # Global dashboard state
├── lib/
│   ├── api/
│   │   └── client.ts           # API client functions
│   ├── hooks/                  # Custom React hooks
│   │   ├── useMarketData.ts   # Market data hook
│   │   ├── useNews.ts         # News data hook
│   │   └── useSentiment.ts    # Sentiment analysis hook
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Utility functions
├── public/                     # Static assets
├── .env.example                # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- API keys (optional, mock data available):
  - OpenAI API key
  - Finnhub or Alpha Vantage API key
  - NewsAPI key (optional)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd trading-sentiment-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
# OpenAI API Configuration (optional - mock data available)
OPENAI_API_KEY=your_openai_api_key_here

# Market Data API (optional - choose one or use mock data)
FINNHUB_API_KEY=your_finnhub_api_key_here
# OR
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here

# News API Configuration (optional - mock data available)
NEWS_API_KEY=your_news_api_key_here
```

**Note**: The application will work with mock data if API keys are not provided, making it easy to test without external dependencies.

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Getting API Keys (Optional)

- **OpenAI**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Finnhub**: [https://finnhub.io/register](https://finnhub.io/register) (Free tier available)
- **Alpha Vantage**: [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key) (Free tier available)
- **NewsAPI**: [https://newsapi.org/register](https://newsapi.org/register) (Free tier available)

## Usage Guide

### Basic Usage

1. **Select Stocks**: Use the stock selector to add symbols (AAPL, GOOGL, MSFT, etc.)
2. **View Market Data**: Real-time price, change, volume, and trend indicators
3. **Analyze Sentiment**: Interactive chart showing sentiment trends over time
4. **Read News**: Latest news articles with sentiment analysis
5. **Control Updates**: Toggle live updates on/off as needed
6. **Switch Themes**: Toggle between light and dark mode

### Time Ranges

- **1H**: Last 1 hour of data
- **4H**: Last 4 hours of data
- **1D**: Last 24 hours of data
- **1W**: Last 7 days of data

### Live Updates

- Market data refreshes every 30 seconds
- News refreshes every 60 seconds
- Can be paused/resumed with the live indicator toggle

## Key Features for Technical Interviews

### 1. React Component Patterns

**Composition and Reusability**
```typescript
// Example: Card composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

**Custom Hooks for Data Fetching**
```typescript
// useMarketData hook with React Query
const { data, isLoading, error } = useMarketData(symbol, refreshInterval);
```

**Context API for Global State**
```typescript
const { selectedStocks, addStock, removeStock } = useDashboard();
```

### 2. TypeScript Implementation

- Strict typing throughout the codebase
- Interface definitions for all data structures
- Type-safe API responses
- Proper generics usage

### 3. Performance Optimizations

- React Query caching reduces API calls
- Memoized components prevent unnecessary re-renders
- Lazy loading for optimal bundle size
- Optimized re-renders with proper dependencies

### 4. API Integration

- Clean separation between API client and components
- Error handling with fallback data
- Request caching and deduplication
- Automatic retries on failure

### 5. Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-optimized interactions
- Flexible grid layouts

## Building for Production

### Build the application
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Run linting
```bash
npm run lint
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Set Environment Variables**

In the Vercel dashboard, add your environment variables:
- `OPENAI_API_KEY`
- `FINNHUB_API_KEY` or `ALPHA_VANTAGE_API_KEY`
- `NEWS_API_KEY`

### Alternative Deployments

- **Netlify**: Works with Next.js plugin
- **AWS Amplify**: Supports Next.js SSR
- **Docker**: Dockerfile can be added for containerization

## Demo Flow for Interviews

1. **Landing Page**: Clean, professional UI with immediate value
2. **Stock Selection**: Demonstrate search, multi-select, and validation
3. **Real-time Updates**: Show live data refresh and animations
4. **Sentiment Analysis**: Interact with charts, change time ranges
5. **Responsive Design**: Resize browser to demonstrate mobile view
6. **Theme Toggle**: Smooth transition between light/dark modes
7. **Error Handling**: Show toast notifications and error states
8. **Code Walkthrough**:
   - Component architecture
   - Custom hooks implementation
   - API route design
   - State management strategy

## Architecture Highlights

### Frontend Patterns

- **Component Composition**: Reusable components with clear props
- **Custom Hooks**: Encapsulated logic for data fetching
- **Context Providers**: Global state without prop drilling
- **Compound Components**: Flexible component APIs

### State Management

- **Local State**: useState for component-specific state
- **Global State**: Context API for dashboard settings
- **Server State**: React Query for API data
- **Persistent State**: localStorage for user preferences

### API Design

- **RESTful Endpoints**: Clear, predictable API routes
- **Error Handling**: Consistent error responses
- **Caching Headers**: Optimized cache control
- **Fallback Data**: Mock data when APIs unavailable

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 90+ (Performance)

## Contributing

This is a portfolio/interview project, but suggestions are welcome!

## License

MIT License - feel free to use this project for learning or interviews

## Author

Built with passion for a technical interview showcasing modern React and Next.js skills.

## Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful component designs
- [Recharts](https://recharts.org/) for powerful charting
- [Vercel](https://vercel.com/) for seamless deployment

---

**Questions?** Feel free to reach out or open an issue!
