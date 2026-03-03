import { NextRequest, NextResponse } from 'next/server'
import { outreachService } from '@/services/outreach.service'

/**
 * POST /api/outreach/generate
 * Generate a personalized outreach email
 */
export async function POST(request: NextRequest) {
  try {
    const { jobTitle, company, userId, recruiterName } = await request.json()

    if (!jobTitle || !company || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get user profile (simplified - in production fetch from DB)
    const profileJSON = {} // Placeholder

    const emailPreview = await outreachService.generateOutreachEmail({
      jobTitle,
      company,
      profileJSON,
      recruiterName,
    })

    return NextResponse.json({ emailPreview })
  } catch (error: any) {
    console.error('Error generating outreach email:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate outreach email' },
      { status: 500 }
    )
  }
}
