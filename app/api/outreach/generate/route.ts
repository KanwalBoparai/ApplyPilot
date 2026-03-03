import { NextRequest, NextResponse } from 'next/server'
import { outreachService } from '@/services/outreach.service'
import { hasAIConfig } from '@/lib/runtime'

/**
 * POST /api/outreach/generate
 * Generate a personalized outreach email
 */
export async function POST(request: NextRequest) {
  try {
    const { jobTitle, company, userId, recruiterName } = await request.json()

    if (!hasAIConfig) {
      return NextResponse.json({
        emailPreview: {
          subject: `Application for ${jobTitle || 'the role'} at ${company || 'your company'}`,
          body: `Dear ${recruiterName || 'Hiring Manager'},\n\nI’m reaching out to express my interest in the ${jobTitle || 'open'} role at ${company || 'your company'}. My background aligns with the role and I would value a chance to connect.\n\nBest regards,`,
          to: '',
        },
        mode: 'mock',
      })
    }

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
