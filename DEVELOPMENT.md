# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ (handled by Codespaces)
- GitHub account
- Supabase account
- OpenAI API key

### Local Development (Codespaces)

Codespaces provides a full cloud-based development environment. No local installation needed!

#### Open in Codespaces:
1. Go to your GitHub repository
2. Click **Code** → **Create codespace on main**
3. Wait for environment to build (~2 minutes)

#### Install dependencies:
```bash
npm install
```

#### Start dev server:
```bash
npm run dev
```

Access at: `http://localhost:3000`

## Project Guidelines

### Code Style
- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Use Tailwind for styling
- Keep components small and focused

### File Organization
```
app/
  ├── (routes)/          # App pages
  ├── api/               # API routes
  └── layout.tsx         # Root layout

components/
  └── *.tsx              # Reusable UI components

services/
  └── *.service.ts       # Business logic

lib/
  └── *.ts               # Utilities and clients

types/
  └── *.ts               # Type definitions
```

### Naming Conventions
- **Components**: PascalCase (`JobCard.tsx`)
- **Services**: camelCase with .service suffix (`jobDiscovery.service.ts`)
- **Types**: PascalCase for interfaces (`Job`, `Application`)
- **API routes**: kebab-case folders (`/api/jobs/suggested`)

## Adding New Features

### 1. Add Database Table

Create migration in `supabase/migrations/`:

```sql
-- 006_create_feature.sql
CREATE TABLE IF NOT EXISTS public.feature (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  -- ... other columns
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.feature ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can read own data"
  ON public.feature
  FOR SELECT
  USING (auth.uid() = user_id);
```

### 2. Add Types

Create in `types/feature.ts`:

```typescript
export interface Feature {
  id: string
  user_id: string
  // ... other fields
  created_at: string
}
```

### 3. Create Service

Create in `services/feature.service.ts`:

```typescript
import { supabaseAdmin } from '@/lib/supabase'

export class FeatureService {
  async getFeatures(userId: string) {
    const { data } = await supabaseAdmin
      .from('feature')
      .select('*')
      .eq('user_id', userId)
    
    return data
  }
}

export const featureService = new FeatureService()
```

### 4. Add API Route

Create in `app/api/feature/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { featureService } from '@/services/feature.service'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const data = await featureService.getFeatures(userId!)
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

### 5. Create UI Component

Create in `components/FeatureCard.tsx`:

```typescript
'use client'

interface FeatureCardProps {
  // ... props
}

export default function FeatureCard({ ... }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      {/* ... content */}
    </div>
  )
}
```

### 6. Add Page

Create in `app/feature/page.tsx`:

```typescript
'use client'

import { useState, useEffect } from 'react'
import FeatureCard from '@/components/FeatureCard'

export default function FeaturePage() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    // Fetch data
  }, [])
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... page content */}
    </div>
  )
}
```

## Common Tasks

### Run Linter
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

### Build for Production
```bash
npm run build
```

### Check TypeScript
```bash
npx tsc --noEmit
```

## Testing

### Manual Testing Checklist

#### Resume Flow:
1. Upload resume in Settings
2. Verify parsing in console
3. Check data saved in Supabase

#### Job Discovery:
1. Browse jobs page
2. Test filters
3. Verify job data loads

#### Application Flow:
1. Click "Apply" on a job
2. Verify cover letter generation
3. Check outreach email draft
4. Verify application tracked in dashboard

## Debugging

### API Routes
Check Vercel function logs or console output:
```bash
# In Codespaces terminal
npm run dev
# Watch for console logs
```

### Database Queries
Use Supabase SQL Editor to test queries:
```sql
SELECT * FROM applications WHERE user_id = 'xxx';
```

### OpenAI Calls
Monitor in OpenAI dashboard:
- Usage tab shows API calls
- Logs show request/response

## Environment Management

### Development (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
OPENAI_API_KEY=sk-...
```

### Production (Vercel)
All environment variables set in Vercel dashboard

### Secrets Management
❌ Never commit `.env.local`
❌ Never hardcode API keys
✅ Use environment variables
✅ Keep `.env.local.example` updated

## Git Workflow

### Branching Strategy
```bash
main                    # Production
  ├── develop          # Development
  ├── feature/xyz      # Feature branches
  └── fix/abc          # Bug fixes
```

### Commit Messages
```
feat: Add job bookmarking feature
fix: Resolve resume parsing error
docs: Update deployment guide
refactor: Simplify outreach service
```

## Performance Tips

### Code Splitting
Use dynamic imports for heavy components:
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

### API Optimization
- Batch database queries
- Cache frequently accessed data
- Use database indexes
- Paginate large result sets

### UI Optimization
- Lazy load images
- Debounce search inputs
- Use React.memo for expensive components
- Virtualize long lists

## Troubleshooting

### TypeScript Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Supabase Connection Issues
- Verify environment variables
- Check RLS policies
- Test query in SQL Editor

### Build Failures
- Check all imports are correct
- Verify environment variables exist
- Look for TypeScript errors

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Need Help?

1. Check error logs
2. Review documentation
3. Search GitHub issues
4. Ask in project discussions
