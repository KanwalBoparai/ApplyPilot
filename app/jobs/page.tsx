'use client'

import { useState, useEffect } from 'react'
import JobCard from '@/components/JobCard'
import FilterPanel from '@/components/FilterPanel'
import { Job, JobFilters } from '@/types/job'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<JobFilters>({})

  useEffect(() => {
    fetchJobs()
  }, [filters])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      // Build query string
      const params = new URLSearchParams()
      if (filters.workType) params.set('workType', filters.workType.join(','))
      if (filters.roleType) params.set('roleType', filters.roleType.join(','))
      if (filters.term) params.set('term', filters.term.join(','))
      if (filters.year) params.set('year', filters.year.toString())
      if (filters.minSalary)
        params.set('minSalary', filters.minSalary.toString())

      const response = await fetch(`/api/jobs?${params.toString()}`)
      const data = await response.json()
      setJobs(data.jobs || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (jobId: string) => {
    // Navigate to application flow
    window.location.href = `/jobs/${jobId}/apply`
  }

  return (
    <div className="app-shell">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-semibold text-white">
          Browse Jobs
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters */}
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={setFilters} />
          </div>

          {/* Job List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="glass-card p-8 text-center text-slate-300">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <p className="text-slate-300">
                  No jobs found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
