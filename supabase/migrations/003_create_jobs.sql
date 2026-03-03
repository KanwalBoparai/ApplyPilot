-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  work_type TEXT NOT NULL CHECK (work_type IN ('remote', 'hybrid', 'onsite')),
  role_type TEXT NOT NULL CHECK (role_type IN ('engineering', 'design', 'product', 'sales', 'other')),
  term TEXT NOT NULL CHECK (term IN ('fulltime', 'parttime', 'contract', 'internship')),
  year INTEGER, -- For new grad positions
  salary_min INTEGER,
  salary_max INTEGER,
  source TEXT NOT NULL,
  apply_url TEXT NOT NULL,
  recruiter_email TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for filtering
CREATE INDEX idx_jobs_work_type ON public.jobs(work_type);
CREATE INDEX idx_jobs_role_type ON public.jobs(role_type);
CREATE INDEX idx_jobs_term ON public.jobs(term);
CREATE INDEX idx_jobs_company ON public.jobs(company);
CREATE INDEX idx_jobs_created_at ON public.jobs(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone authenticated can read jobs
CREATE POLICY "Authenticated users can read jobs"
  ON public.jobs
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Service role can insert jobs (for automated scraping)
CREATE POLICY "Service role can insert jobs"
  ON public.jobs
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
