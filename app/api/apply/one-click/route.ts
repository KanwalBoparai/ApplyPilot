import { NextRequest, NextResponse } from 'next/server'
import { applicationService } from '@/services/application.service'

/**
 * POST /api/apply/one-click
 * Initiate one-click assist mode
 */
export async function POST(request: NextRequest) {
  try {
    const { userId, jobId } = await request.json()

    if (!userId || !jobId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await applicationService.initiateOneClickAssist({
      userId,
      jobId,
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error initiating one-click assist:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to initiate application' },
      { status: 500 }
    )
  }
}
