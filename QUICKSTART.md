# Quick Start Guide

Welcome! This guide will get you up and running with the Job Application Agent in under 10 minutes.

## � Demo Mode (No Setup Required!)

The app runs in **demo mode** by default, with sample data built-in. Here's what you can do right now:

### Browse Sample Jobs
1. Run `npm run dev`
2. Open http://localhost:3001 (or 3000)
3. Click **"Open Dashboard"** → See mock stats (24 applications, 15 suggested jobs, 3 interviews)
4. Click **"Browse Jobs"** → See 5 sample job listings
5. Try the filters (work type, role, salary range) - they work even in demo mode!
6. Click **"Apply Now"** on any job card (goes to apply flow)

### Upload & Parse Resume
1. Go to **Settings** page
2. Upload any `.txt` file (paste your resume content)
3. See it parsed into skills, experience, education (without OpenAI if not configured)
4. Adjust "Preferred Locations" and "Target Companies" - saved locally

### Chrome Extension (Demo)
1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode** (toggle top-right)
3. Click **"Load unpacked"**
4. Select the `chrome-extension` folder from this project
5. Visit any website → Click **ApplyPilot icon** → Side panel shows
6. Set backend URL to `http://localhost:3001` (or 3000)
7. Click **"Extract Job From Page"** → Extracts page title and meta info → Sends to app

### What's Real vs. Mock?
| Feature | Status | Details |
|---------|--------|---------|
| UI & Pages | ✅ Real | Full dark dashboard, jobs list, settings |
| Sample Data | ✅ Real | 5 sample jobs, mock stats on dashboard |
| Resume Parsing | 🟡 Basic | Splits by lines/keywords; needs OpenAI for advanced parsing |
| Job Discovery | 🟡 Mock | Returns sample jobs; real discov needs Supabase |
| Cover Letter Gen | 🟡 Template | Returns template; needs OpenAI for AI-generated letters |
| Email Drafts | 🟡 Template | Returns template; needs OpenAI for AI emails |
| Job Applications | 📝 Logged Locally | Tracks in memory; Supabase needed for persistence |

---

## �🎯 What You'll Build

A cloud-ready job application platform that:
- Parses resumes with AI
- Discovers jobs from public sources
- Generates cover letters
- Drafts recruiter emails
- Tracks applications

## 📋 Prerequisites

You need accounts for these free services:
1. [GitHub](https://github.com) - Code hosting
2. [Supabase](https://supabase.com) - Database
3. [OpenAI](https://platform.openai.com) - AI features
4. [Resend](https://resend.com) - Email sending (optional)
5. [Vercel](https://vercel.com) - Hosting (optional for production)

## 🚀 Step-by-Step Setup

### Step 1: Get the Code (2 minutes)

#### Option A: Use GitHub Codespaces (Recommended)
1. Push this code to a GitHub repository
2. Go to your repo on GitHub
3. Click **Code** → **Codespaces** → **Create codespace on main**
4. Wait for the environment to initialize

#### Option B: Local Development
```bash
git clone https://github.com/YOUR_USERNAME/job-application-agent.git
cd job-application-agent
npm install
```

### Step 2: Set Up Supabase (3 minutes)

1. **Create Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Enter:
     - Name: `job-application-agent`
     - Database Password: (generate strong password)
     - Region: (closest to you)
   - Click "Create new project"
   - Wait ~2 minutes for provisioning

2. **Run Migrations**
   - In Supabase Dashboard, click "SQL Editor"
   - Open each file from `supabase/migrations/` in this repo
   - Copy and paste into SQL Editor
   - Run in this order:
     1. `001_create_users.sql`
     2. `002_create_candidate_profiles.sql`
     3. `003_create_jobs.sql`
     4. `004_create_applications.sql`
     5. `005_create_outreach.sql`

3. **Get API Keys**
   - Click "Settings" (gear icon)
   - Click "API"
   - Copy these values:
     - Project URL
     - `anon` `public` key
     - `service_role` `secret` key
   - Keep this tab open!

### Step 3: Get OpenAI API Key (1 minute)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in or create account
3. Click your profile → "View API keys"
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. Add $5-10 credits for testing

### Step 4: Configure Environment (1 minute)

1. In your Codespace or local project, copy example env:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in:
   ```bash
   # From Supabase (Step 2)
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

   # From OpenAI (Step 3)
   OPENAI_API_KEY=sk-...

   # Email (optional - can add later)
   RESEND_API_KEY=

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Step 5: Start Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

You should see the homepage! 🎉

### Step 6: Test the Features (2 minutes)

1. **Upload Resume**
   - Click "Go to Dashboard"
   - Click "Upload Resume"
   - Upload a resume file (PDF or TXT)
   - Wait for AI parsing (5-10 seconds)
   - You should see "Resume parsed successfully"

2. **Browse Jobs**
   - Click "Browse Jobs"
   - Try filtering by work type, role, etc.
   - (Note: Job list will be empty until you add jobs)

3. **Check Dashboard**
   - View application statistics
   - See suggested jobs (once available)

## 🎨 Optional: Add Sample Jobs

To test the full flow, add some sample jobs:

1. Go to Supabase Dashboard → SQL Editor
2. Run this query:

```sql
INSERT INTO public.jobs (title, company, location, work_type, role_type, term, apply_url, source)
VALUES
  ('Software Engineer', 'Acme Corp', 'San Francisco, CA', 'remote', 'engineering', 'fulltime', 'https://example.com/apply', 'manual'),
  ('Product Designer', 'Design Co', 'New York, NY', 'hybrid', 'design', 'fulltime', 'https://example.com/apply', 'manual'),
  ('Frontend Developer', 'Tech Startup', 'Remote', 'remote', 'engineering', 'fulltime', 'https://example.com/apply', 'manual');
```

3. Refresh your app - jobs should appear!

## 📧 Optional: Set Up Email (for Outreach)

### Option 1: Resend (Easiest)
1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Add your domain OR use their test domain
4. Create API key
5. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_...
   ```

### Option 2: Gmail OAuth (Advanced)
See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed instructions.

## 🚢 Optional: Deploy to Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for full deployment guide.

Quick deploy to Vercel:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Add environment variables
5. Deploy!

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] All 5 migrations run successfully
- [ ] Supabase API keys copied to `.env.local`
- [ ] OpenAI API key added to `.env.local`
- [ ] Dev server running (`npm run dev`)
- [ ] Homepage loads at http://localhost:3000
- [ ] Can upload resume in Settings
- [ ] Resume parsing works
- [ ] Sample jobs visible (if added)

## 🎯 Next Steps

Now that you're set up:

1. **Add Job Sources**
   - Implement YC Jobs RSS parser
   - Add Greenhouse API integration
   - Connect other job boards

2. **Customize UI**
   - Update colors in `tailwind.config.ts`
   - Modify components in `components/`
   - Add your branding

3. **Enhance Features**
   - Improve AI prompts for better generation
   - Add more filters
   - Build analytics dashboard

4. **Deploy to Production**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Set up custom domain
   - Configure monitoring

## 🐛 Troubleshooting

### Can't connect to Supabase
- Verify URL and keys in `.env.local`
- Check Supabase project is not paused
- Test connection in Supabase dashboard

### Resume parsing fails
- Check OpenAI API key is valid
- Verify you have credits in OpenAI account
- Check console for error messages

### Jobs not loading
- Add sample jobs (see above)
- Check Supabase tables have data
- Verify RLS policies allow read access

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Guides](https://supabase.com/docs/guides)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🆘 Need Help?

- Check [DEVELOPMENT.md](DEVELOPMENT.md) for detailed dev guide
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Open a GitHub Issue for bugs
- Start a GitHub Discussion for questions

## 🎉 You're All Set!

You now have a fully functional job application automation platform running locally!

Start by:
1. Uploading your resume
2. Adding some sample jobs
3. Testing the application flow
4. Customizing to your needs

Happy job hunting! 🚀
