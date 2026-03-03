# 🎯 ApplyPilot - AI-Powered Job Application Platform

A modern, dark-themed job application automation platform powered by **OpenRouter AI** (Meta Llama 3.1 8B), **Neon PostgreSQL**, and **Next.js 14**.

✨ **Status**: MVP Complete & Fully Functional

![Dark UI](https://img.shields.io/badge/UI-Dark%20Glassmorphic-00d4ff?style=flat-square)
![AI](https://img.shields.io/badge/AI-OpenRouter%20%2B%20Llama-blueviolet?style=flat-square)
![Database](https://img.shields.io/badge/Database-Neon%20PostgreSQL-brightgreen?style=flat-square)
![Framework](https://img.shields.io/badge/Next.js-14-black?style=flat-square)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- OpenRouter API key (free tier available)
- Neon account (free tier available)

### Step 1: Clone Repository

```bash
git clone https://github.com/KanwalBoparai/ApplyPilot.git
cd ApplyPilot
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file:

```bash
# OpenRouter AI Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct

# Neon PostgreSQL Configuration
NEON_PROJECT_ID=your_project_id
NEON_BRANCH_ID=your_branch_id
NEON_ENDPOINT_ID=your_endpoint_id
DATABASE_URL=your_neon_connection_string
```

#### Get OpenRouter API Key (Free)
1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up and generate an API key
3. Add to `.env.local` as `OPENROUTER_API_KEY`
4. Model: `meta-llama/llama-3.1-8b-instruct` (free, fast)

#### Set Up Neon Database (Free)
1. Go to [neon.tech](https://neon.tech) and sign up
2. Run in terminal:
   ```bash
   npx neonctl@latest init
   ```
3. Follow prompts to authenticate and select project
4. Copy connection string to `.env.local` as `DATABASE_URL`
5. Database tables auto-create on first run ✨

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app with dark glassmorphic UI.

### Step 5: Load Chrome Extension (Optional)

1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select `chrome-extension/` folder
4. Click extension icon on any website for split-view panel

## 📁 Project Structure

```
ApplyPilot/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   │   ├── jobs/               # Job discovery (Neon-backed)
│   │   ├── resume/             # Resume parsing (OpenRouter AI)
│   │   ├── outreach/           # Email generation (OpenRouter AI)
│   │   └── apply/              # Application tracking (Neon-backed)
│   ├── dashboard/              # Dark themed dashboard
│   ├── jobs/                   # Job browsing with filters
│   ├── settings/               # Resume upload & settings
│   ├── page.tsx                # Homepage (dark hero)
│   └── layout.tsx              # Root layout
├── components/                  # React components
│   ├── JobCard.tsx             # Glass-card job display
│   ├── FilterPanel.tsx         # Dark filter UI
│   └── DashboardStats.tsx      # Live stats from API
├── lib/                         # Core utilities
│   ├── ai.ts                   # OpenRouter AI wrapper ⭐
│   ├── neon.ts                 # Neon PostgreSQL client ⭐
│   ├── runtime.ts              # Environment config ⭐
│   ├── supabase.ts             # Supabase (future features)
│   └── email.ts                # Email service
├── services/                    # Business logic
│   ├── resume.service.ts       # Resume parsing + cover letters
│   ├── outreach.service.ts     # Recruiter outreach
│   ├── application.service.ts  # Application management
│   ├── jobDiscovery.service.ts # Job scraping
│   └── analytics.service.ts    # Dashboard analytics
├── chrome-extension/            # Chrome Manifest V3 ⭐
│   ├── manifest.json           # Extension config
│   ├── sidepanel.html          # Side panel UI
│   ├── sidepanel.js            # Panel logic
│   ├── background.js           # Service worker
│   └── content-extractor.js    # Job data extraction
├── types/                       # TypeScript types
│   ├── job.ts
│   ├── profile.ts
│   ├── outreach.ts
│   └── application.ts
└── VERIFICATION_CHECKLIST.md    # Feature verification ⭐
```

⭐ = New in latest release

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Browser (Dark Glassmorphic UI)                         │
│  - Homepage / Dashboard / Jobs / Settings               │
│  - Chrome Extension Side Panel                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  Next.js 14 App Router (Vercel)                         │
│  - API Routes (/api/*)                                  │
│  - Server Components                                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  Service Layer                                          │
│  ├─ Resume Service    (AI parsing & cover letters)     │
│  ├─ Outreach Service  (AI email generation)            │
│  ├─ Job Service       (Discovery & filtering)          │
│  └─ Application       (Tracking & analytics)           │
└─────────┬──────────────────────────┬────────────────────┘
          │                          │
          ▼                          ▼
┌──────────────────────┐   ┌──────────────────────────────┐
│  OpenRouter AI       │   │  Neon PostgreSQL             │
│  (Meta Llama 3.1 8B) │   │  - jobs table                │
│  - Resume parsing    │   │  - applications table        │
│  - Cover letters     │   │  - Auto-schema creation      │
│  - Outreach emails   │   │  - Serverless branching      │
└──────────────────────┘   └──────────────────────────────┘
```

**Tech Stack**:
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI**: OpenRouter API + Meta Llama 3.1 8B Instruct
- **Database**: Neon (PostgreSQL serverless)
- **Deployment**: Vercel (auto-deploy from GitHub)
- **Extension**: Chrome Manifest V3 Side Panel

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

## 📊 Features & Status

### ✅ Completed & Tested (MVP)
- [x] **Dark Glassmorphic UI** - cadastral.ai-inspired design with glass cards, gradient text, cyan accents
- [x] **Resume Parsing** - OpenRouter AI extracts skills, experience, education from resume text
- [x] **Outreach Email Generation** - AI-powered personalized cold emails for recruiters
- [x] **Job Discovery** - Browse and filter jobs from Neon database (6 sample jobs seeded)
- [x] **Application Tracking** - Track applications with status, interview dates, notes
- [x] **Dashboard Analytics** - Live stats from API (total applications, suggested jobs, interviews, response rate)
- [x] **Neon Database** - Auto-schema creation, persistent storage, serverless PostgreSQL
- [x] **Chrome Extension** - Manifest V3 side panel for job extraction on any website
- [x] **Cover Letter Generation** - AI endpoint ready (requires user profile system)

### 🔧 API Endpoints (All Working)
- ✅ `GET /api/jobs` - List jobs with filters (Neon-backed)
- ✅ `POST /api/jobs` - Create new job (Neon insert)
- ✅ `POST /api/resume/parse` - Parse resume with OpenRouter AI
- ✅ `POST /api/outreach/generate` - Generate outreach email with AI
- ✅ `GET /api/apply/applications` - Get user applications (Neon with JOIN)
- ✅ `PATCH /api/apply/applications` - Update application status
- ⚠️ `POST /api/resume/cover-letter` - Ready (needs user auth)

### 🎨 Pages (All Functional)
- ✅ `/` - Homepage with dark hero, gradient headings
- ✅ `/dashboard` - Stats dashboard with live API data
- ✅ `/jobs` - Job browser with filter panel & glass cards
- ✅ `/settings` - Resume upload with drop zone

### 🚀 Phase 2 (Coming Soon)
- [ ] User authentication (Supabase Auth or NextAuth)
- [ ] Advanced analytics and trends
- [ ] Email response tracking
- [ ] Job ranking algorithm
- [ ] Batch application processing
- [ ] Calendar integration for interviews

### 💡 Phase 3 (Future)
- [ ] Redis queue for job processing
- [ ] Webhook integrations
- [ ] Team collaboration features
- [ ] Mobile app (React Native)
- [ ] Browser automation (Playwright) for one-click apply

## 🧩 Chrome Extension (Split View on Any Website)

The project includes a Chrome Manifest V3 extension at `chrome-extension/` that opens ApplyPilot in Chrome's Side Panel.

### Load the Extension
1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `chrome-extension/` folder
5. Pin **ApplyPilot Sidekick** from the extensions menu (puzzle icon)

### Usage
1. Navigate to any website (http/https)
2. Click the ApplyPilot extension icon in toolbar
3. Side panel opens with split view
4. Set **Backend URL** in panel:
    - Local dev: `http://localhost:3000`
    - Production: `https://your-vercel-domain.vercel.app`
5. Click **Save**

### Features
- **Open Dashboard** - Quick link to your dashboard
- **Open Jobs** - View job listings
- **Extract Job From Page** - Captures job metadata from current page and sends to `/api/jobs`

**Note**: Side panel works on normal web pages. Chrome restricts extensions on `chrome://` internal pages.

## � Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done ✅)
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **Import Project**
   - Select your GitHub repository
   - Vercel auto-detects Next.js

3. **Add Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   OPENROUTER_API_KEY=your_key
   OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct
   DATABASE_URL=your_neon_connection_string
   NEON_PROJECT_ID=your_project_id
   NEON_BRANCH_ID=your_branch_id
   NEON_ENDPOINT_ID=your_endpoint_id
   ```

4. **Deploy**
   - Click **Deploy**
   - Vercel builds and deploys automatically
   - Get your live URL: `https://your-app.vercel.app`

### Database (Neon)
- Already cloud-hosted ✅
- Auto-creates tables on first API call
- Serverless with generous free tier
- Branching for dev/staging/prod

### Continuous Deployment
- Push to `main` branch → auto-deploys to production
- Push to other branches → preview deployments
- All environment variables inherited from Vercel settings

## � Testing & Verification

All features have been tested and verified. See [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md) for detailed test results.

### Quick Test Commands

**Test Resume Parsing** (OpenRouter AI):
```bash
curl -X POST http://localhost:3000/api/resume/parse \
  -H "Content-Type: application/json" \
  -d '{"resumeText":"Senior Software Engineer with 5 years experience in Node.js, React, PostgreSQL"}'
```

**Test Outreach Email Generation**:
```bash
curl -X POST http://localhost:3000/api/outreach/generate \
  -H "Content-Type: application/json" \
  -d '{"jobTitle":"Software Engineer","company":"TechCorp","userId":"demo","recruiterName":"John"}'
```

**Test Jobs API (Neon)**:
```bash
curl http://localhost:3000/api/jobs
```

**Expected**: All endpoints return JSON with AI-generated content or database data.

## 🤖 Why OpenRouter + Llama?

**Cost-Effective**: OpenRouter provides access to Meta Llama 3.1 8B with generous free tier and pay-per-use pricing significantly cheaper than OpenAI.

**Performance**: Llama 3.1 8B is optimized for:
- Resume parsing (structured extraction)
- Cover letter generation
- Email composition
- Fast response times (<2s typical)

**Flexibility**: OpenRouter routes to multiple AI providers, making it easy to switch models without code changes.

**Alternatives Tested**:
- ❌ Gemini: Free tier quota exhausted quickly
- ❌ Groq: Limited free tier, rate limits
- ✅ OpenRouter: Best balance of cost, speed, and reliability

## 🎨 UI Design Philosophy

**Dark Glassmorphic Theme** (inspired by cadastral.ai):
- **Background**: Dark slate gradient (`from-slate-950 via-slate-900 to-slate-950`)
- **Cards**: Glass effect with backdrop blur (`bg-slate-900/60 backdrop-blur`)
- **Accents**: Cyan primary (`#00d4ff`), gradient text for headings
- **Borders**: Subtle slate-800 borders on all cards
- **Inputs**: Dark backgrounds with cyan focus rings
- **Icons**: Lucide React with colored badge backgrounds

**Consistency**: All pages (home, dashboard, jobs, settings) share the same dark aesthetic for cohesive UX.

## 🤝 Contributing

This is an open-source personal project. Contributions welcome!

**To Contribute**:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Development Guidelines**:
- Follow existing code style (TypeScript, ESLint)
- Test all API endpoints before submitting
- Update documentation for new features
- Maintain dark UI theme consistency

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Step-by-step setup guide
- **[VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)** - Feature testing results
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development workflows and API docs
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[SECURITY.md](SECURITY.md)** - Security best practices

## ⚠️ Responsible Use & Disclaimer

**This Tool is Designed to ASSIST, Not Automate**

✅ **What This Tool Does**:
- Parses your resume to extract structured data
- Generates personalized cover letters and outreach emails
- Helps you discover and filter job opportunities
- Tracks your application progress and analytics
- Provides AI-powered writing assistance

❌ **What This Tool Does NOT Do**:
- Automatically submit applications without your review
- Bypass CAPTCHA or authentication systems
- Scrape protected or paywalled content
- Violate terms of service of job boards
- Spam recruiters with mass emails

**User Responsibilities**:
- Review all AI-generated content before using
- Manually submit applications through proper channels
- Comply with each company's application process
- Follow ethical recruiting practices
- Respect rate limits and API usage policies

**Privacy**: Your resume data and API keys stay in your environment. This is a self-hosted solution—no data is sent to third parties except OpenRouter (for AI) and Neon (for database).

**Ethics**: Use this tool to enhance your job search, not to game the system. Quality over quantity—focus on jobs you're genuinely interested in.

---

**Built with ❤️ for job seekers**  
Star ⭐ this repo if you find it helpful!

**Questions?** Open an issue on [GitHub](https://github.com/KanwalBoparai/ApplyPilot/issues)
