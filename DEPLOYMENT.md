# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add the following (all optional):
     - `OPENAI_API_KEY`
     - `FINNHUB_API_KEY` or `ALPHA_VANTAGE_API_KEY`
     - `NEWS_API_KEY`

5. Redeploy for environment variables to take effect:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)

3. Click "New Project"

4. Import your GitHub repository

5. Vercel will auto-detect Next.js configuration

6. Add environment variables in the project settings

7. Deploy!

## Alternative Deployment Options

### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

### Docker

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t trading-sentiment-dashboard .
docker run -p 3000:3000 trading-sentiment-dashboard
```

## Environment Variables for Production

Create these variables in your deployment platform:

```
OPENAI_API_KEY=sk-...
FINNHUB_API_KEY=...
NEWS_API_KEY=...
```

Note: The app will use mock data if these are not set, making it perfect for demos!

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test stock selection functionality
- [ ] Check real-time data updates
- [ ] Test theme toggle (light/dark mode)
- [ ] Verify mobile responsiveness
- [ ] Test error handling (disable network)
- [ ] Check API rate limits
- [ ] Monitor performance metrics
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)

## Performance Tips

1. **Enable Edge Functions** (Vercel):
   - Add `export const runtime = 'edge'` to API routes

2. **Enable Caching**:
   - Already configured in API routes
   - Adjust `s-maxage` values as needed

3. **Monitor Bundle Size**:
```bash
npm run build
# Check .next/analyze for bundle size
```

4. **Enable Compression**:
   - Automatically handled by Vercel/Netlify

## Troubleshooting

### Build Errors

**Error**: "Module not found"
- Solution: Run `npm install` and commit `package-lock.json`

**Error**: TypeScript errors
- Solution: Run `npm run lint` locally to catch errors before deploying

### Runtime Errors

**Error**: "API rate limit exceeded"
- Solution: Implement rate limiting or upgrade API plan

**Error**: "CORS errors"
- Solution: API routes are on same domain, shouldn't occur

### Performance Issues

**Slow API responses**:
- Check API response times
- Enable caching headers
- Consider using edge functions

## Monitoring

### Set up Error Tracking

Recommended services:
- Sentry
- LogRocket
- Vercel Analytics

### Performance Monitoring

- Vercel Analytics (built-in)
- Google Lighthouse
- WebPageTest

## Custom Domain Setup

### Vercel
1. Go to project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### SSL Certificate
- Automatically provisioned by Vercel
- No additional configuration needed

## Scaling Considerations

1. **API Rate Limits**: Monitor and upgrade as needed
2. **Database**: Consider adding Redis for caching
3. **CDN**: Already handled by Vercel Edge Network
4. **Load Testing**: Test with k6 or Artillery

## Security Best Practices

- [ ] Never commit `.env` files
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up proper CORS policies
- [ ] Implement rate limiting on API routes
- [ ] Regular dependency updates
- [ ] Security headers (Next.js defaults are good)

## Cost Optimization

### Free Tier Limits
- **Vercel**: 100GB bandwidth, unlimited requests
- **Finnhub**: 60 calls/minute (free tier)
- **OpenAI**: Pay per use
- **NewsAPI**: 100 requests/day (free tier)

### Optimization Tips
1. Use mock data for development
2. Implement aggressive caching
3. Batch API requests where possible
4. Monitor usage with dashboard analytics

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

Good luck with your deployment!
