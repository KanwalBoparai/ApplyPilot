import { NextRequest, NextResponse } from 'next/server'
import { resumeService } from '@/services/resume.service'
import { hasAIConfig } from '@/lib/runtime'

/**
 * POST /api/resume/parse
 * Parse uploaded resume text to structured JSON
 */
export async function POST(request: NextRequest) {
  try {
    const { resumeText, userId } = await request.json()

    if (!hasAIConfig) {
      const lines = String(resumeText || '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

      const mockResumeData = {
        skills: lines
          .filter((line) => /skills?/i.test(line))
          .flatMap((line) => line.replace(/skills?:?/i, '').split(','))
          .map((skill) => skill.trim())
          .filter(Boolean),
        experience: [],
        projects: [],
        education: [],
        strengths: ['Quick learner', 'Strong communicator'],
        summary: 'Mock parsed resume. Add OPENAI_API_KEY for full AI parsing.',
      }

      return NextResponse.json({ resumeData: mockResumeData, mode: 'mock' })
    }

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
