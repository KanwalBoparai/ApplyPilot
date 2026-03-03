export interface Application {
  id: string
  user_id: string
  job_id: string
  status: 'suggested' | 'applied' | 'interview' | 'rejected' | 'offer'
  applied_at?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface ApplicationWithJob extends Application {
  job: {
    title: string
    company: string
    location: string
  }
}

export interface DashboardStats {
  totalApplications: number
  suggestedJobs: number
  interviewsScheduled: number
  responseRate: number
  weeklyApplications: number
  emailReplies: number
}
