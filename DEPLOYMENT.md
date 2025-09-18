# HB Legal Intelligence Platform - Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:

1. **API Keys**:
   - OpenAI API key (for GPT-4 Vision)
   - Anthropic API key (for Claude)
   - Supabase project credentials

2. **Accounts**:
   - Vercel account (recommended) or other hosting provider
   - Supabase account
   - GitHub account (for version control)

3. **Tools**:
   - Node.js 18+ installed
   - Git installed
   - npm or yarn package manager

## 🚀 Quick Deployment to Vercel

### 1. Prepare Your Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/hb-legal-platform.git
cd hb-legal-platform

# Install dependencies
npm install

# Test locally
npm run dev
```

### 2. Set Up Supabase

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database schema**:
   - Go to SQL Editor in Supabase Dashboard
   - Copy contents of `supabase/schema.sql`
   - Run the SQL to create tables and functions

3. **Configure Storage**:
   - Go to Storage in Supabase Dashboard
   - Create a new bucket called `documents`
   - Set it to private (authenticated access only)

4. **Get your credentials**:
   - Project URL: Settings → API → Project URL
   - Anon Key: Settings → API → Project API keys → anon public
   - Service Role Key: Settings → API → Project API keys → service_role

### 3. Deploy to Vercel

#### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

#### Option B: Deploy via GitHub Integration

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings

### 4. Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```env
# Required API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Optional: Microsoft Integration
AZURE_AD_CLIENT_ID=your_azure_client_id
AZURE_AD_CLIENT_SECRET=your_azure_secret
AZURE_AD_TENANT_ID=your_tenant_id

# Optional: Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 5. Configure Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `legal.huschblackwell.com`)
3. Follow DNS configuration instructions

## 🔧 Production Configuration

### Security Checklist

- [ ] Enable Vercel Authentication
- [ ] Configure CORS in `next.config.js`
- [ ] Set up rate limiting
- [ ] Enable Supabase RLS policies
- [ ] Configure CSP headers
- [ ] Set up SSL certificate (automatic with Vercel)
- [ ] Enable audit logging
- [ ] Configure backup strategy

### Performance Optimization

1. **Enable Caching**:
```javascript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=60, s-maxage=120, stale-while-revalidate',
        },
      ],
    },
  ],
}
```

2. **Configure Edge Functions**:
```javascript
// app/api/process-document/route.ts
export const runtime = 'edge' // Enable edge runtime
export const maxDuration = 60 // Set timeout
```

3. **Optimize Images**:
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
}
```

### Monitoring Setup

1. **Vercel Analytics** (automatic):
   - Page views
   - Performance metrics
   - Error tracking

2. **Custom Monitoring**:
```javascript
// lib/monitoring.ts
export const logMetric = async (metric: {
  name: string
  value: number
  tags?: Record<string, string>
}) => {
  // Send to your monitoring service
  await fetch('/api/metrics', {
    method: 'POST',
    body: JSON.stringify(metric),
  })
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🔍 Testing Production

### Smoke Tests

1. **Document Upload**:
   - Upload a sample PDF
   - Verify processing completes
   - Check results accuracy

2. **API Endpoints**:
```bash
# Test document processing
curl -X POST https://your-domain.com/api/process-document \
  -H "Content-Type: multipart/form-data" \
  -F "file=@sample.pdf"
```

3. **Database Connection**:
   - Create test user
   - Upload document
   - Verify data persistence

### Load Testing

```javascript
// load-test.js
import http from 'k6/http'
import { check } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
}

export default function () {
  const response = http.get('https://your-domain.com')
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  })
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

2. **API Key Issues**:
   - Verify keys in Vercel dashboard
   - Check for trailing spaces
   - Ensure correct environment (preview/production)

3. **Database Connection**:
   - Check Supabase service status
   - Verify connection pooling settings
   - Review RLS policies

4. **Performance Issues**:
   - Enable Vercel Analytics
   - Check API response times
   - Optimize database queries

### Debug Mode

Enable detailed logging:

```javascript
// lib/debug.ts
export const debug = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development' || 
        process.env.ENABLE_DEBUG === 'true') {
      console.log('[DEBUG]', ...args)
    }
  },
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args)
    // Send to error tracking service
  }
}
```

## 📊 Monitoring & Maintenance

### Daily Checks
- [ ] Review error logs
- [ ] Check API usage limits
- [ ] Monitor response times
- [ ] Review security alerts

### Weekly Tasks
- [ ] Backup database
- [ ] Review usage metrics
- [ ] Update dependencies
- [ ] Check for security updates

### Monthly Tasks
- [ ] Performance audit
- [ ] Cost analysis
- [ ] User feedback review
- [ ] Update documentation

## 🔒 Security Best Practices

1. **API Key Rotation**:
   - Rotate keys every 90 days
   - Use different keys for dev/staging/prod
   - Never commit keys to version control

2. **Access Control**:
   - Implement role-based access
   - Use Supabase RLS
   - Enable MFA for admin accounts

3. **Data Protection**:
   - Encrypt sensitive data
   - Implement data retention policies
   - Regular security audits

4. **Compliance**:
   - GDPR compliance checks
   - CCPA compliance
   - Legal document retention requirements

## 📞 Support

### Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

### Contact
- Technical Issues: Create GitHub issue
- Security Concerns: security@huschblackwell.com
- Business Questions: innovation@huschblackwell.com

## 🎉 Launch Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Database schema deployed
- [ ] Authentication enabled
- [ ] SSL certificate active
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Rate limiting enabled
- [ ] Error tracking active
- [ ] Documentation complete
- [ ] Team training completed
- [ ] Support process defined
- [ ] Legal review completed
- [ ] Security audit passed
- [ ] Performance tested
- [ ] Go-live plan approved

---

**Congratulations!** Your HB Legal Intelligence Platform is now deployed and ready to transform legal workflows.

Last Updated: January 2025
