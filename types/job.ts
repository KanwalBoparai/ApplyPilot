export interface Job {
  id: string
  title: string
  company: string
  location: string
  work_type: 'remote' | 'hybrid' | 'onsite'
  role_type: 'engineering' | 'design' | 'product' | 'sales' | 'other'
  term: 'fulltime' | 'parttime' | 'contract' | 'internship'
  year?: number // For new grad positions
  salary_min?: number
  salary_max?: number
  source: string
  apply_url: string
  recruiter_email?: string
  description?: string
  created_at: string
}

export interface JobFilters {
  country?: string
  workType?: Job['work_type'][]
  roleType?: Job['role_type'][]
  term?: Job['term'][]
  year?: number
  minSalary?: number
}
