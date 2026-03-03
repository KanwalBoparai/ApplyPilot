-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('suggested', 'applied', 'interview', 'rejected', 'offer')),
  applied_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own applications
CREATE POLICY "Users can read own applications"
  ON public.applications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own applications
CREATE POLICY "Users can insert own applications"
  ON public.applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own applications
CREATE POLICY "Users can update own applications"
  ON public.applications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_applications_user_id ON public.applications(user_id);
CREATE INDEX idx_applications_job_id ON public.applications(job_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_created_at ON public.applications(created_at DESC);

-- Create updated_at trigger
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
