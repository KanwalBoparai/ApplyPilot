import { NextRequest, NextResponse } from 'next/server'
import { applicationService } from '@/services/application.service'

/**
 * GET /api/apply/applications
 * Get user's applications
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const status = request.nextUrl.searchParams.get('status') as any

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const applications = await applicationService.getUserApplications(
      userId,
      status
    )

    return NextResponse.json({ applications })
  } catch (error: any) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/apply/applications
 * Update application status
 */
export async function PATCH(request: NextRequest) {
  try {
    const { userId, jobId, status, notes } = await request.json()

    if (!userId || !jobId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await applicationService.updateApplicationStatus({
      userId,
      jobId,
      status,
      notes,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update application' },
      { status: 500 }
    )
  }
}
