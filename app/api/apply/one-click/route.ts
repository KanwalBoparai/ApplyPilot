import { NextRequest, NextResponse } from 'next/server'
import { applicationService } from '@/services/application.service'
import { hasAIConfig, hasSupabaseConfig } from '@/lib/runtime'

/**
 * POST /api/apply/one-click
 * Initiate one-click assist mode
 */
export async function POST(request: NextRequest) {
  try {
    const { userId, jobId } = await request.json()

    if (!hasSupabaseConfig || !hasAIConfig) {
      return NextResponse.json({
        coverLetter:
          'Mock cover letter: Configure OPENAI_API_KEY and Supabase to generate real personalized content.',
        outreachDraftId: 'mock-outreach-draft-id',
        applyUrl: 'https://example.com/apply',
        mode: 'mock',
      })
    }

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
