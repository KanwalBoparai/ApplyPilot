export interface CandidateProfile {
  id: string
  user_id: string
  parsed_resume_json: ResumeData
  preferences_json: CandidatePreferences
  created_at: string
  updated_at: string
}

export interface ResumeData {
  skills: string[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  education: EducationItem[]
  strengths: string[]
  summary?: string
}

export interface ExperienceItem {
  company: string
  title: string
  duration: string
  description: string[]
}

export interface ProjectItem {
  name: string
  description: string
  technologies: string[]
  url?: string
}

export interface EducationItem {
  institution: string
  degree: string
  field: string
  graduationYear?: number
}

export interface CandidatePreferences {
  countries: string[]
  workTypes: string[]
  roleTypes: string[]
  terms: string[]
  minSalary?: number
  targetCompanies?: string[]
}
