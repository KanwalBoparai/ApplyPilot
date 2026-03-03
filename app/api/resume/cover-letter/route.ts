import { NextRequest, NextResponse } from 'next/server'
import { resumeService } from '@/services/resume.service'
import { hasAIConfig, hasSupabaseConfig } from '@/lib/runtime'

/**
 * POST /api/resume/cover-letter
 * Generate a tailored cover letter
 */
export async function POST(request: NextRequest) {
  try {
    const { jobTitle, company, jobDescription, userId } = await request.json()

    if (!hasAIConfig || !hasSupabaseConfig) {
      return NextResponse.json({
        coverLetter: `Dear Hiring Manager,\n\nI am excited to apply for the ${jobTitle || 'role'} position at ${company || 'your company'}. My background aligns well with your needs, and I would welcome the opportunity to contribute.\n\nBest regards,`,
        mode: 'mock',
      })
    }

    if (!jobTitle || !company || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get user's resume data
    const resumeData = await resumeService.getResumeData(userId)
    if (!resumeData) {
      return NextResponse.json(
        { error: 'Resume not found. Please upload your resume first.' },
        { status: 404 }
      )
    }

    // Generate cover letter
    const coverLetter = await resumeService.generateCoverLetter({
      jobTitle,
      company,
      jobDescription,
      resumeData,
    })

    return NextResponse.json({ coverLetter })
  } catch (error: any) {
    console.error('Error generating cover letter:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate cover letter' },
      { status: 500 }
    )
  }
}
