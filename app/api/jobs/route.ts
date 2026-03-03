import { NextRequest, NextResponse } from 'next/server'
import { jobDiscoveryService } from '@/services/jobDiscovery.service'
import { JobFilters } from '@/types/job'
import { hasSupabaseConfig } from '@/lib/runtime'
import { ensureNeonSchema, hasNeonConfig, queryNeon } from '@/lib/neon'

/**
 * GET /api/jobs
 * Fetch and filter jobs based on query parameters
 */
export async function GET(request: NextRequest) {
  try {
    if (!hasSupabaseConfig && hasNeonConfig) {
      await ensureNeonSchema()

      const searchParams = request.nextUrl.searchParams
      const workType = searchParams.get('workType')?.split(',')
      const roleType = searchParams.get('roleType')?.split(',')
      const term = searchParams.get('term')?.split(',')
      const year = searchParams.get('year')
      const minSalary = searchParams.get('minSalary')

      const filters: string[] = []
      const values: any[] = []

      if (workType?.length) {
        values.push(workType)
        filters.push(`work_type = ANY($${values.length})`)
      }

      if (roleType?.length) {
        values.push(roleType)
        filters.push(`role_type = ANY($${values.length})`)
      }

      if (term?.length) {
        values.push(term)
        filters.push(`term = ANY($${values.length})`)
      }

      if (year) {
        values.push(Number(year))
        filters.push(`year = $${values.length}`)
      }

      if (minSalary) {
        values.push(Number(minSalary))
        filters.push(`COALESCE(salary_max, 0) >= $${values.length}`)
      }

      const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : ''
      const jobs = await queryNeon(
        `SELECT * FROM jobs ${whereClause} ORDER BY created_at DESC`,
        values
      )

      return NextResponse.json({ jobs, mode: 'neon' })
    }

    if (!hasSupabaseConfig) {
      // Return sample mock jobs for development
      const mockJobs = [
        {
          id: '1',
          title: 'Senior Full Stack Engineer',
          company: 'Tech Startup Inc',
          location: 'San Francisco, CA',
          work_type: 'Full-time',
          role_type: 'Full Stack',
          term: 'Permanent',
          source: 'LinkedIn',
          apply_url: 'https://linkedin.com/jobs/1',
          salary_min: 150000,
          salary_max: 200000,
          description: 'Looking for an experienced full stack engineer to join our growing team...',
          recruiter_email: 'hiring@techstartup.com',
          year: 2026,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Frontend Developer',
          company: 'Design Co',
          location: 'New York, NY',
          work_type: 'Full-time',
          role_type: 'Frontend',
          term: 'Permanent',
          source: 'Indeed',
          apply_url: 'https://indeed.com/jobs/2',
          salary_min: 120000,
          salary_max: 160000,
          description: 'Create beautiful user interfaces with React and Tailwind CSS...',
          recruiter_email: 'jobs@designco.com',
          year: 2026,
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'DevOps Engineer',
          company: 'Cloud Systems',
          location: 'Seattle, WA',
          work_type: 'Full-time',
          role_type: 'DevOps',
          term: 'Permanent',
          source: 'LinkedIn',
          apply_url: 'https://linkedin.com/jobs/3',
          salary_min: 140000,
          salary_max: 190000,
          description: 'Manage cloud infrastructure and deployment pipelines at scale...',
          recruiter_email: 'careers@cloudsystems.com',
          year: 2026,
          created_at: new Date().toISOString(),
        },
        {
          id: '4',
          title: 'Backend Engineer - Python',
          company: 'Data Analytics Corp',
          location: 'Boston, MA',
          work_type: 'Full-time',
          role_type: 'Backend',
          term: 'Permanent',
          source: 'AngelList',
          apply_url: 'https://angellist.com/jobs/4',
          salary_min: 130000,
          salary_max: 180000,
          description: 'Build scalable backend systems using Python and PostgreSQL...',
          recruiter_email: 'talent@dataanalytics.com',
          year: 2026,
          created_at: new Date().toISOString(),
        },
        {
          id: '5',
          title: 'UI/UX Designer',
          company: 'Creative Agency',
          location: 'Austin, TX',
          work_type: 'Full-time',
          role_type: 'Design',
          term: 'Permanent',
          source: 'Dribbble',
          apply_url: 'https://dribbble.com/jobs/5',
          salary_min: 100000,
          salary_max: 140000,
          description: 'Design delightful user experiences for web and mobile apps...',
          recruiter_email: 'design@creativeagency.com',
          year: 2026,
          created_at: new Date().toISOString(),
        },
      ]
      
      return NextResponse.json({
        jobs: mockJobs,
        mode: 'mock',
        message: 'Supabase is not configured. Showing sample job listings.',
      })
    }

    const searchParams = request.nextUrl.searchParams

    // Build filters from query parameters
    const filters: JobFilters = {}

    const workType = searchParams.get('workType')
    if (workType) {
      filters.workType = workType.split(',') as any[]
    }

    const roleType = searchParams.get('roleType')
    if (roleType) {
      filters.roleType = roleType.split(',') as any[]
    }

    const term = searchParams.get('term')
    if (term) {
      filters.term = term.split(',') as any[]
    }

    const year = searchParams.get('year')
    if (year) {
      filters.year = parseInt(year)
    }

    const minSalary = searchParams.get('minSalary')
    if (minSalary) {
      filters.minSalary = parseInt(minSalary)
    }

    const jobs = await jobDiscoveryService.filterJobs(filters)

    return NextResponse.json({ jobs })
  } catch (error: any) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/jobs
 * Manually add a job (for testing or manual entry)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!hasSupabaseConfig && hasNeonConfig) {
      await ensureNeonSchema()

      const id = body.id || crypto.randomUUID()
      const now = new Date().toISOString()
      const year = Number(body.year || new Date().getFullYear())

      await queryNeon(
        `INSERT INTO jobs (id, title, company, location, work_type, role_type, term, year, salary_min, salary_max, source, apply_url, recruiter_email, description, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           company = EXCLUDED.company,
           location = EXCLUDED.location,
           work_type = EXCLUDED.work_type,
           role_type = EXCLUDED.role_type,
           term = EXCLUDED.term,
           year = EXCLUDED.year,
           salary_min = EXCLUDED.salary_min,
           salary_max = EXCLUDED.salary_max,
           source = EXCLUDED.source,
           apply_url = EXCLUDED.apply_url,
           recruiter_email = EXCLUDED.recruiter_email,
           description = EXCLUDED.description`,
        [
          id,
          body.title || 'Untitled Role',
          body.company || 'Unknown Company',
          body.location || 'Unknown',
          body.work_type || 'remote',
          body.role_type || 'engineering',
          body.term || 'fulltime',
          year,
          body.salary_min || null,
          body.salary_max || null,
          body.source || 'manual',
          body.apply_url || '',
          body.recruiter_email || null,
          body.description || null,
          now,
        ]
      )

      return NextResponse.json({ success: true, id, mode: 'neon' })
    }

    if (!hasSupabaseConfig) {
      return NextResponse.json({
        success: true,
        mode: 'mock',
        saved: body,
      })
    }
    
    await jobDiscoveryService.storeJobs([body])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create job' },
      { status: 500 }
    )
  }
}
