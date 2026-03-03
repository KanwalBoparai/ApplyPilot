import { openai, DEFAULT_MODEL } from '@/lib/openai'
import { sendEmail } from '@/lib/email'
import { supabaseAdmin } from '@/lib/supabase'
import { OutreachTemplate, EmailPreview } from '@/types/outreach'

/**
 * Outreach Service
 * 
 * Responsibilities:
 * - Generate personalized recruiter outreach emails
 * - Preview emails before sending
 * - Send approved emails via Resend or Gmail OAuth
 * - Track email status and responses
 */

export class OutreachService {
  /**
   * Generate personalized cold email for recruiter outreach
   */
  async generateOutreachEmail(params: OutreachTemplate): Promise<EmailPreview> {
    const { jobTitle, company, profileJSON, recruiterName } = params

    const greeting = recruiterName
      ? `Dear ${recruiterName},`
      : 'Dear Hiring Manager,'

    const prompt = `Generate a concise, professional cold email expressing interest in the ${jobTitle} position at ${company}.

Candidate background:
${JSON.stringify(profileJSON, null, 2)}

Requirements:
- Keep it under 150 words
- Professional but warm tone
- Reference 1-2 relevant experiences
- Clear call to action
- Do NOT include subject line
- Start with "${greeting}"
- End with "Best regards,"
- Do NOT include candidate name or contact info (will be added separately)`

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 250,
    })

    const emailBody = response.choices[0].message.content || ''

    // Generate subject line
    const subject = `Application for ${jobTitle} at ${company}`

    return {
      subject,
      body: emailBody,
      to: '', // Will be filled in from job data
    }
  }

  /**
   * Create outreach draft in database (requires manual approval)
   */
  async createOutreachDraft(params: {
    userId: string
    jobId: string
    recruiterEmail: string
    subject: string
    body: string
  }): Promise<string> {
    const { userId, jobId, recruiterEmail, subject, body } = params

    const { data, error } = await supabaseAdmin
      .from('outreach')
      .insert({
        user_id: userId,
        job_id: jobId,
        recruiter_email: recruiterEmail,
        email_subject: subject,
        email_body: body,
        email_status: 'pending_approval',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error creating outreach draft:', error)
      throw error
    }

    return data.id
  }

  /**
   * Send approved outreach email
   */
  async sendOutreachEmail(outreachId: string, userEmail: string): Promise<void> {
    // Fetch outreach details
    const { data: outreach } = await supabaseAdmin
      .from('outreach')
      .select('*')
      .eq('id', outreachId)
      .single()

    if (!outreach) {
      throw new Error('Outreach not found')
    }

    if (outreach.email_status !== 'pending_approval') {
      throw new Error('Email already sent or not approved')
    }

    try {
      // Send email
      await sendEmail({
        to: outreach.recruiter_email,
        subject: outreach.email_subject,
        html: outreach.email_body.replace(/\n/g, '<br>'),
        from: userEmail,
      })

      // Update status
      await supabaseAdmin
        .from('outreach')
        .update({
          email_status: 'sent',
          sent_at: new Date().toISOString(),
        })
        .eq('id', outreachId)
    } catch (error) {
      // Mark as failed
      await supabaseAdmin
        .from('outreach')
        .update({
          email_status: 'failed',
        })
        .eq('id', outreachId)

      throw error
    }
  }

  /**
   * Get all outreach emails for a user
   */
  async getUserOutreach(userId: string) {
    const { data } = await supabaseAdmin
      .from('outreach')
      .select(
        `
        *,
        jobs:job_id (
          title,
          company
        )
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return data || []
  }

  /**
   * Get outreach statistics
   */
  async getOutreachStats(userId: string) {
    const { data } = await supabaseAdmin
      .from('outreach')
      .select('email_status')
      .eq('user_id', userId)

    if (!data) return { total: 0, sent: 0, pending: 0, failed: 0 }

    return {
      total: data.length,
      sent: data.filter((o: any) => o.email_status === 'sent').length,
      pending: data.filter((o: any) => o.email_status === 'pending_approval')
        .length,
      failed: data.filter((o: any) => o.email_status === 'failed').length,
    }
  }
}

export const outreachService = new OutreachService()
