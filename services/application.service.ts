import { supabaseAdmin } from '@/lib/supabase'
import { resumeService } from './resume.service'
import { outreachService } from './outreach.service'

/**
 * Application Orchestrator Service
 * 
 * Responsibilities:
 * - Coordinate the application process
 * - Track application status
 * - Implement "One Click Assist" mode
 * - Handle autonomous mode (when safe/allowed)
 */

export class ApplicationService {
  /**
   * One Click Assist Mode (Default)
   * 
   * This is the SAFE mode that:
   * 1. Generates all materials
   * 2. Opens apply URL in new tab
   * 3. Drafts outreach email
   * 4. User submits manually
   */
  async initiateOneClickAssist(params: {
    userId: string
    jobId: string
  }): Promise<{
    coverLetter: string
    outreachDraftId: string
    applyUrl: string
  }> {
    const { userId, jobId } = params

    // Fetch job details
    const { data: job } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single()

    if (!job) {
      throw new Error('Job not found')
    }

    // Fetch user resume
    const resumeData = await resumeService.getResumeData(userId)
    if (!resumeData) {
      throw new Error('Resume not found. Please upload your resume first.')
    }

    // Generate cover letter
    const coverLetter = await resumeService.generateCoverLetter({
      jobTitle: job.title,
      company: job.company,
      jobDescription: job.description,
      resumeData,
    })

    // Generate outreach email if recruiter email exists
    let outreachDraftId = ''
    if (job.recruiter_email) {
      const emailPreview = await outreachService.generateOutreachEmail({
        jobTitle: job.title,
        company: job.company,
        profileJSON: resumeData,
      })

      outreachDraftId = await outreachService.createOutreachDraft({
        userId,
        jobId,
        recruiterEmail: job.recruiter_email,
        subject: emailPreview.subject,
        body: emailPreview.body,
      })
    }

    // Create application record
    await this.createApplication({
      userId,
      jobId,
      status: 'suggested',
    })

    return {
      coverLetter,
      outreachDraftId,
      applyUrl: job.apply_url,
    }
  }

  /**
   * Create or update application record
   */
  async createApplication(params: {
    userId: string
    jobId: string
    status: 'suggested' | 'applied' | 'interview' | 'rejected' | 'offer'
    notes?: string
  }) {
    const { userId, jobId, status, notes } = params

    const { error } = await supabaseAdmin.from('applications').upsert(
      {
        user_id: userId,
        job_id: jobId,
        status,
        notes,
        applied_at: status === 'applied' ? new Date().toISOString() : null,
      },
      {
        onConflict: 'user_id,job_id',
      }
    )

    if (error) {
      console.error('Error creating application:', error)
      throw error
    }
  }

  /**
   * Update application status
   */
  async updateApplicationStatus(params: {
    userId: string
    jobId: string
    status: 'suggested' | 'applied' | 'interview' | 'rejected' | 'offer'
    notes?: string
  }) {
    const { userId, jobId, status, notes } = params

    const updateData: any = {
      status,
    }

    if (notes) {
      updateData.notes = notes
    }

    if (status === 'applied') {
      updateData.applied_at = new Date().toISOString()
    }

    const { error } = await supabaseAdmin
      .from('applications')
      .update(updateData)
      .eq('user_id', userId)
      .eq('job_id', jobId)

    if (error) {
      console.error('Error updating application:', error)
      throw error
    }
  }

  /**
   * Get all applications for a user
   */
  async getUserApplications(
    userId: string,
    status?: 'suggested' | 'applied' | 'interview' | 'rejected' | 'offer'
  ) {
    let query = supabaseAdmin
      .from('applications')
      .select(
        `
        *,
        job:job_id (
          id,
          title,
          company,
          location,
          work_type,
          role_type,
          term,
          salary_min,
          salary_max,
          apply_url
        )
      `
      )
      .eq('user_id', userId)

    if (status) {
      query = query.eq('status', status)
    }

    const { data } = await query.order('created_at', { ascending: false })

    return data || []
  }

  /**
   * Get application by ID
   */
  async getApplication(userId: string, jobId: string) {
    const { data } = await supabaseAdmin
      .from('applications')
      .select('*')
      .eq('user_id', userId)
      .eq('job_id', jobId)
      .single()

    return data
  }
}

export const applicationService = new ApplicationService()
