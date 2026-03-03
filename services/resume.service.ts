import { openai, DEFAULT_MODEL } from '@/lib/openai'
import { supabaseAdmin } from '@/lib/supabase'
import { ResumeData } from '@/types/profile'

/**
 * Resume Intelligence Service
 * 
 * Responsibilities:
 * - Parse uploaded resumes to structured JSON
 * - Generate tailored cover letters
 * - Create job-specific answers
 * - Provide skills alignment analysis
 */

export class ResumeService {
  /**
   * Parse resume text to structured JSON using OpenAI
   */
  async parseResume(resumeText: string): Promise<ResumeData> {
    const prompt = `You are an expert resume parser. Extract structured information from the following resume.

Resume:
${resumeText}

Return ONLY valid JSON with this exact structure:
{
  "skills": ["skill1", "skill2", ...],
  "experience": [
    {
      "company": "Company Name",
      "title": "Job Title",
      "duration": "Jan 2020 - Dec 2022",
      "description": ["achievement 1", "achievement 2"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief description",
      "technologies": ["tech1", "tech2"],
      "url": "optional-url"
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "graduationYear": 2020
    }
  ],
  "strengths": ["strength1", "strength2"],
  "summary": "Brief professional summary"
}`

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0].message.content
    if (!content) {
      throw new Error('Failed to parse resume')
    }

    return JSON.parse(content) as ResumeData
  }

  /**
   * Generate a tailored cover letter for a specific job
   */
  async generateCoverLetter(params: {
    jobTitle: string
    company: string
    jobDescription?: string
    resumeData: ResumeData
  }): Promise<string> {
    const { jobTitle, company, jobDescription, resumeData } = params

    const prompt = `Generate a professional cover letter for the following job application.

Job Title: ${jobTitle}
Company: ${company}
${jobDescription ? `Job Description: ${jobDescription}` : ''}

Candidate Profile:
${JSON.stringify(resumeData, null, 2)}

Requirements:
- Keep it concise (200-300 words)
- Highlight relevant experience and skills
- Show enthusiasm for the role
- Professional tone
- Do not include address or contact information (will be added separately)
- Start with "Dear Hiring Manager," or similar`

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    return response.choices[0].message.content || ''
  }

  /**
   * Generate skills alignment analysis
   */
  async analyzeSkillsAlignment(params: {
    jobDescription: string
    resumeData: ResumeData
  }): Promise<{
    matchingSkills: string[]
    missingSkills: string[]
    score: number
  }> {
    const { jobDescription, resumeData } = params

    const prompt = `Analyze the skills alignment between the job requirements and candidate profile.

Job Description:
${jobDescription}

Candidate Skills:
${resumeData.skills.join(', ')}

Return ONLY valid JSON with this structure:
{
  "matchingSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3", "skill4"],
  "score": 85
}

Where score is a percentage (0-100) of how well the candidate matches the role.`

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0].message.content
    if (!content) {
      throw new Error('Failed to analyze skills')
    }

    return JSON.parse(content)
  }

  /**
   * Save parsed resume to user profile
   */
  async saveResumeToProfile(
    userId: string,
    resumeData: ResumeData
  ): Promise<void> {
    const { error } = await supabaseAdmin
      .from('candidate_profiles')
      .upsert({
        user_id: userId,
        parsed_resume_json: resumeData,
      })
      .eq('user_id', userId)

    if (error) {
      console.error('Error saving resume:', error)
      throw error
    }
  }

  /**
   * Get user's resume data
   */
  async getResumeData(userId: string): Promise<ResumeData | null> {
    const { data } = await supabaseAdmin
      .from('candidate_profiles')
      .select('parsed_resume_json')
      .eq('user_id', userId)
      .single()

    return data?.parsed_resume_json || null
  }
}

export const resumeService = new ResumeService()
