import { NextRequest, NextResponse } from 'next/server'
import { jobDiscoveryService } from '@/services/jobDiscovery.service'
import { JobFilters } from '@/types/job'

/**
 * GET /api/jobs
 * Fetch and filter jobs based on query parameters
 */
export async function GET(request: NextRequest) {
  try {
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
