import { NextRequest, NextResponse } from 'next/server'
import { jobDiscoveryService } from '@/services/jobDiscovery.service'

/**
 * GET /api/jobs/suggested
 * Get suggested jobs for the current user based on their preferences
 */
export async function GET(request: NextRequest) {
  try {
    // In production, get userId from authenticated session
    // For now, using a query parameter
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const jobs = await jobDiscoveryService.getSuggestedJobs(userId)

    return NextResponse.json({ jobs })
  } catch (error: any) {
    console.error('Error fetching suggested jobs:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch suggested jobs' },
      { status: 500 }
    )
  }
}
