# Job Application Automation Platform

A cloud-ready, AI-powered job application platform built with Next.js, Supabase, and OpenAI.

## 🚀 Quick Start (GitHub Codespaces)

### Step 1: Open in Codespaces

1. Push this code to GitHub
2. Click **Code** → **Open with Codespaces**
3. Wait for the environment to initialize

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file (copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

Fill in your credentials:

#### Supabase Setup
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings → API
4. Copy your URL and keys to `.env.local`
5. Run migrations:
   - Go to SQL Editor in Supabase Dashboard
   - Copy and run each migration from `supabase/migrations/` in order

#### OpenAI Setup
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Add to `.env.local`

#### Email Setup (Choose One)

**Option 1: Resend (Recommended)**
1. Go to [resend.com](https://resend.com)
2. Get API key
3. Add to `.env.local`

**Option 2: Gmail OAuth**
1. Set up OAuth credentials in Google Cloud Console
2. Add credentials to `.env.local`

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
job-application-agent/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   │   ├── jobs/           # Job discovery endpoints
│   │   ├── resume/         # Resume parsing endpoints
│   │   ├── outreach/       # Email generation endpoints
│   │   └── apply/          # Application management
│   ├── dashboard/          # Dashboard page
│   ├── jobs/               # Job browsing page
│   ├── settings/           # Settings page
│   └── layout.tsx          # Root layout
├── components/              # React components
│   ├── JobCard.tsx
│   ├── FilterPanel.tsx
│   └── DashboardStats.tsx
├── lib/                     # Utility libraries
│   ├── supabase.ts         # Supabase client
│   ├── openai.ts           # OpenAI client
│   └── email.ts            # Email service
├── services/                # Business logic
│   ├── jobDiscovery.service.ts
│   ├── resume.service.ts
│   ├── outreach.service.ts
│   ├── application.service.ts
│   └── analytics.service.ts
├── supabase/
│   └── migrations/         # Database schema
└── types/                   # TypeScript types
    ├── job.ts
    ├── profile.ts
    ├── outreach.ts
    └── application.ts
```

## 🏗 Architecture

```
Browser → Next.js Frontend (Vercel)
              ↓
         API Routes
              ↓
       Service Layer
         /    |    \
    Jobs  Resume  Outreach
              ↓
    Supabase (Postgres + Auth)
```

## 🔐 Security & Compliance

### What This Platform Does:
✅ Uses official job board APIs (YC Jobs RSS, Greenhouse, etc.)
✅ Parses publicly available data
✅ Generates application materials
✅ Assists with manual submission
✅ Tracks applications

### What This Platform Does NOT Do:
❌ Bypass CAPTCHA
❌ Automate login to third-party sites
❌ Submit applications automatically without user action
❌ Scrape protected content

## 📊 Features

### Phase 1 (MVP) ✅
- [x] Resume upload and AI parsing
- [x] Job discovery from public sources
- [x] Job filtering by preferences
- [x] Cover letter generation
- [x] Recruiter outreach email drafting
- [x] Application tracking
- [x] Dashboard with analytics

### Phase 2 (Coming Soon)
- [ ] Advanced analytics and trends
- [ ] Email response tracking
- [ ] Job ranking algorithm
- [ ] Batch processing
- [ ] Calendar integration for interviews

### Phase 3 (Future)
- [ ] Redis queue for job processing
- [ ] Webhook integrations
- [ ] Team collaboration features
- [ ] Chrome extension

## 🔧 API Endpoints

### Jobs
- `GET /api/jobs` - List jobs with filters
- `GET /api/jobs/suggested` - Get suggested jobs for user
- `POST /api/jobs` - Manually add a job

### Resume
- `POST /api/resume/parse` - Parse resume to JSON
- `POST /api/resume/cover-letter` - Generate cover letter

### Outreach
- `POST /api/outreach/generate` - Generate outreach email
- `POST /api/outreach/send` - Send approved email

### Applications
- `POST /api/apply/one-click` - Initiate one-click assist
- `GET /api/apply/applications` - Get user applications
- `PATCH /api/apply/applications` - Update application status

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Database (Supabase)
- Already cloud-hosted
- Run migrations via SQL Editor
- Enable Row Level Security

## 📝 Development Workflow

1. **Code in Codespaces** - No local setup needed
2. **Test locally** - `npm run dev`
3. **Push to GitHub** - Auto-deploys to Vercel
4. **Access anywhere** - Works on any device with browser

## 🤝 Contributing

This is a personal project following ethical job application practices. If you have suggestions or find issues, please open a GitHub issue.

## 📄 License

MIT License - See LICENSE file for details

## ⚠️ Disclaimer

This tool is designed to ASSIST with job applications, not to automate them completely. Users are responsible for:
- Reviewing all generated content
- Manually submitting applications
- Complying with each company's application policies
- Following ethical recruiting practices

Never use this tool to spam recruiters or bypass application security measures.
