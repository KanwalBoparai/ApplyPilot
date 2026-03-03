export interface Outreach {
  id: string
  job_id: string
  recruiter_email: string
  email_subject: string
  email_body: string
  email_status: 'draft' | 'pending_approval' | 'sent' | 'failed'
  sent_at?: string
  created_at: string
}

export interface OutreachTemplate {
  jobTitle: string
  company: string
  profileJSON: any
  recruiterName?: string
}

export interface EmailPreview {
  subject: string
  body: string
  to: string
}
