-- Create outreach table
CREATE TABLE IF NOT EXISTS public.outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  recruiter_email TEXT NOT NULL,
  email_subject TEXT NOT NULL,
  email_body TEXT NOT NULL,
  email_status TEXT NOT NULL CHECK (email_status IN ('draft', 'pending_approval', 'sent', 'failed')),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.outreach ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own outreach
CREATE POLICY "Users can read own outreach"
  ON public.outreach
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own outreach
CREATE POLICY "Users can insert own outreach"
  ON public.outreach
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own outreach
CREATE POLICY "Users can update own outreach"
  ON public.outreach
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_outreach_user_id ON public.outreach(user_id);
CREATE INDEX idx_outreach_job_id ON public.outreach(job_id);
CREATE INDEX idx_outreach_email_status ON public.outreach(email_status);
CREATE INDEX idx_outreach_created_at ON public.outreach(created_at DESC);
