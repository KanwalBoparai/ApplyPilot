# Deployment Guide

## Deploy to Vercel (Frontend)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/job-application-agent.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables

In Vercel project settings, add all variables from `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
OPENAI_API_KEY=...
RESEND_API_KEY=...
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Step 4: Deploy

Click **Deploy**. Your app will be live in ~2 minutes.

## Set Up Supabase (Database)

### Step 1: Create Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Choose region closest to your users
4. Set database password (save it securely)

### Step 2: Run Migrations

1. Go to **SQL Editor** in Supabase Dashboard
2. Run each migration file in order:
   - `001_create_users.sql`
   - `002_create_candidate_profiles.sql`
   - `003_create_jobs.sql`
   - `004_create_applications.sql`
   - `005_create_outreach.sql`

### Step 3: Enable Auth

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional)

### Step 4: Get API Keys

1. Go to **Settings** → **API**
2. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key
3. Add to Vercel environment variables

## Configure Email Service

### Option 1: Resend

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain (or use their test domain)
3. Create API key
4. Add to environment variables

### Option 2: Gmail OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Gmail API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Add credentials to environment variables

## Set Up OpenAI

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create API key
3. Add billing information
4. Add to environment variables

**Cost estimate**: ~$0.01-0.05 per resume parse or cover letter generation

## Testing Deployment

1. Visit your Vercel URL
2. Test each feature:
   - [ ] Resume upload
   - [ ] Job browsing
   - [ ] Cover letter generation
   - [ ] Email drafting
   - [ ] Application tracking

## Monitoring

### Vercel
- Dashboard shows deployment logs
- Analytics for page views
- Function logs for API routes

### Supabase
- Database logs
- Auth logs
- API usage statistics

### OpenAI
- Usage dashboard
- Cost tracking
- Rate limit monitoring

## Troubleshooting

### Environment Variables Not Working
- Redeploy after changing variables
- Check variable names match exactly
- Ensure no trailing spaces

### Database Connection Fails
- Verify Supabase URL is correct
- Check network/firewall settings
- Ensure RLS policies are set correctly

### API Routes 500 Error
- Check Vercel function logs
- Verify all environment variables are set
- Check service API keys are valid

## Production Checklist

- [ ] All migrations run successfully
- [ ] Environment variables set in Vercel
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] Error tracking set up (Sentry, etc.)
- [ ] Database backups enabled
- [ ] Rate limiting configured
- [ ] Email sending domain verified
- [ ] User authentication working

## Scaling Considerations

### When you hit 1000+ users:
1. Add Redis for caching
2. Implement job queue (BullMQ)
3. Add database indexes for common queries
4. Consider CDN for static assets
5. Set up monitoring alerts

### When you hit 10,000+ users:
1. Move to dedicated database
2. Implement horizontal scaling
3. Add load balancer
4. Optimize API endpoints
5. Consider microservices architecture

## Cost Estimates

Free tier covers MVP:
- **Vercel**: Free (Hobby plan)
- **Supabase**: Free (up to 500MB database)
- **Resend**: Free (100 emails/day)
- **OpenAI**: Pay-per-use (~$10-20/month for moderate usage)

Total: **~$10-20/month** for personal use
