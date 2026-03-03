import { Pool } from '@neondatabase/serverless'

const databaseUrl = process.env.DATABASE_URL

let pool: Pool | null = null

function getPool(): Pool {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured')
  }

  if (!pool) {
    pool = new Pool({ connectionString: databaseUrl })
  }

  return pool
}

export const hasNeonConfig = Boolean(databaseUrl)

export async function queryNeon<T = any>(text: string, params: any[] = []) {
  const neonPool = getPool()
  const result = await neonPool.query(text, params)
  return result.rows as T[]
}

export async function ensureNeonSchema() {
  if (!hasNeonConfig) return

  const neonPool = getPool()

  await neonPool.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT NOT NULL,
      work_type TEXT NOT NULL,
      role_type TEXT NOT NULL,
      term TEXT NOT NULL,
      year INTEGER,
      salary_min INTEGER,
      salary_max INTEGER,
      source TEXT NOT NULL,
      apply_url TEXT NOT NULL,
      recruiter_email TEXT,
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `)

  await neonPool.query(`
    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      job_id TEXT NOT NULL,
      status TEXT NOT NULL,
      notes TEXT,
      applied_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now(),
      CONSTRAINT applications_job_fk FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    );
  `)

  const seeded = await neonPool.query('SELECT COUNT(*)::int AS count FROM jobs')
  const count = seeded.rows[0]?.count || 0

  if (count === 0) {
    await neonPool.query(`
      INSERT INTO jobs (id, title, company, location, work_type, role_type, term, year, salary_min, salary_max, source, apply_url, recruiter_email, description)
      VALUES
      ('job-1', 'Senior Full Stack Engineer', 'Tech Startup Inc', 'San Francisco, CA', 'remote', 'engineering', 'fulltime', 2026, 150000, 200000, 'LinkedIn', 'https://linkedin.com/jobs/1', 'hiring@techstartup.com', 'Looking for an experienced full stack engineer to join our growing team...'),
      ('job-2', 'Frontend Developer', 'Design Co', 'New York, NY', 'hybrid', 'engineering', 'fulltime', 2026, 120000, 160000, 'Indeed', 'https://indeed.com/jobs/2', 'jobs@designco.com', 'Create beautiful user interfaces with React and Tailwind CSS...'),
      ('job-3', 'DevOps Engineer', 'Cloud Systems', 'Seattle, WA', 'remote', 'engineering', 'fulltime', 2026, 140000, 190000, 'LinkedIn', 'https://linkedin.com/jobs/3', 'careers@cloudsystems.com', 'Manage cloud infrastructure and deployment pipelines at scale...'),
      ('job-4', 'Backend Engineer - Python', 'Data Analytics Corp', 'Boston, MA', 'onsite', 'engineering', 'fulltime', 2026, 130000, 180000, 'AngelList', 'https://angellist.com/jobs/4', 'talent@dataanalytics.com', 'Build scalable backend systems using Python and PostgreSQL...'),
      ('job-5', 'UI/UX Designer', 'Creative Agency', 'Austin, TX', 'hybrid', 'design', 'fulltime', 2026, 100000, 140000, 'Dribbble', 'https://dribbble.com/jobs/5', 'design@creativeagency.com', 'Design delightful user experiences for web and mobile apps...')
      ON CONFLICT (id) DO NOTHING;
    `)
  }
}
