import { NextRequest, NextResponse } from 'next/server'
import { resumeService } from '@/services/resume.service'

/**
 * POST /api/resume/parse
 * Parse uploaded resume text to structured JSON
 */
export async function POST(request: NextRequest) {
  try {
    const { resumeText, userId } = await request.json()

    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text required' },
        { status: 400 }
      )
    }

    // Parse resume
    const resumeData = await resumeService.parseResume(resumeText)

    // Save to profile if userId provided
    if (userId) {
      await resumeService.saveResumeToProfile(userId, resumeData)
    }

    return NextResponse.json({ resumeData })
  } catch (error: any) {
    console.error('Error parsing resume:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to parse resume' },
      { status: 500 }
    )
  }
}
