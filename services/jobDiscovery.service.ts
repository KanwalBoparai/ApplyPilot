import { supabaseAdmin } from '@/lib/supabase'
import { Job, JobFilters } from '@/types/job'

/**
 * Job Discovery Service
 * 
 * Responsibilities:
 * - Pull jobs from official sources (YC jobs RSS, company career pages)
 * - Normalize job data format
 * - Store jobs in database
 * - Filter jobs based on user preferences
 * 
 * IMPORTANT: This service ONLY uses official APIs and RSS feeds.
 * NO CAPTCHA bypass or automated login is implemented.
 */

export class JobDiscoveryService {
  /**
   * Fetch jobs from Y Combinator jobs RSS feed
   */
  async fetchYCJobs(): Promise<Job[]> {
    try {
      // YC Work at a Startup RSS feed
      const response = await fetch('https://www.ycombinator.com/jobs/rss')
      const xmlText = await response.text()
      
      // Parse RSS feed (simplified - in production use a proper XML parser)
      const jobs = this.parseYCJobsRSS(xmlText)
      
      return jobs
    } catch (error) {
      console.error('Error fetching YC jobs:', error)
      return []
    }
  }

  /**
   * Parse YC jobs RSS feed into standardized Job format
   */
  private parseYCJobsRSS(xmlText: string): Job[] {
    // This is a placeholder. In production, use a proper XML parser like 'fast-xml-parser'
    // For now, this returns an empty array
    console.log('RSS parsing not implemented - use fast-xml-parser package')
    return []
  }

  /**
   * Fetch jobs from public career pages that provide APIs
   * Example: Greenhouse, Lever, Workday public APIs
   */
  async fetchFromCareerPages(companies: string[]): Promise<Job[]> {
    const allJobs: Job[] = []

    for (const company of companies) {
      // Example: Greenhouse public API
      // Replace with actual company-specific logic
      try {
        const jobs = await this.fetchGreenhouseJobs(company)
        allJobs.push(...jobs)
      } catch (error) {
        console.error(`Error fetching jobs for ${company}:`, error)
      }
    }

    return allJobs
  }

  /**
   * Fetch jobs from Greenhouse public boards
   */
  private async fetchGreenhouseJobs(company: string): Promise<Job[]> {
    // Greenhouse provides public JSON endpoints
    // Example: https://boards-api.greenhouse.io/v1/boards/{company}/jobs
    return []
  }

  /**
   * Store jobs in database
   */
  async storeJobs(jobs: Job[]): Promise<void> {
    const { error } = await supabaseAdmin.from('jobs').insert(
      jobs.map((job) => ({
        title: job.title,
        company: job.company,
        location: job.location,
        work_type: job.work_type,
        role_type: job.role_type,
        term: job.term,
        year: job.year,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        source: job.source,
        apply_url: job.apply_url,
        recruiter_email: job.recruiter_email,
        description: job.description,
      }))
    )

    if (error) {
      console.error('Error storing jobs:', error)
      throw error
    }
  }

  /**
   * Filter jobs based on user preferences
   */
  async filterJobs(filters: JobFilters): Promise<Job[]> {
    let query = supabaseAdmin.from('jobs').select('*')

    // Apply filters
    if (filters.workType && filters.workType.length > 0) {
      query = query.in('work_type', filters.workType)
    }

    if (filters.roleType && filters.roleType.length > 0) {
      query = query.in('role_type', filters.roleType)
    }

    if (filters.term && filters.term.length > 0) {
      query = query.in('term', filters.term)
    }

    if (filters.year) {
      query = query.eq('year', filters.year)
    }

    if (filters.minSalary) {
      query = query.gte('salary_min', filters.minSalary)
    }

    // Order by most recent
    query = query.order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error filtering jobs:', error)
      throw error
    }

    return data as Job[]
  }

  /**
   * Get suggested jobs for a user based on their profile
   */
  async getSuggestedJobs(userId: string): Promise<Job[]> {
    // Fetch user profile
    const { data: profile } = await supabaseAdmin
      .from('candidate_profiles')
      .select('preferences_json')
      .eq('user_id', userId)
      .single()

    if (!profile) {
      return []
    }

    // Build filters from preferences
    const filters: JobFilters = {
      workType: profile.preferences_json.workTypes,
      roleType: profile.preferences_json.roleTypes,
      term: profile.preferences_json.terms,
      minSalary: profile.preferences_json.minSalary,
    }

    return this.filterJobs(filters)
  }
}

export const jobDiscoveryService = new JobDiscoveryService()
