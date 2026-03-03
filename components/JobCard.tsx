'use client'

import { Job } from '@/types/job'
import { MapPin, DollarSign, Briefcase } from 'lucide-react'

interface JobCardProps {
  job: Job
  onApply?: (jobId: string) => void
  showApplyButton?: boolean
}

export default function JobCard({
  job,
  onApply,
  showApplyButton = true,
}: JobCardProps) {
  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) return null
    if (job.salary_min && job.salary_max) {
      return `$${(job.salary_min / 1000).toFixed(0)}k - $${(job.salary_max / 1000).toFixed(0)}k`
    }
    if (job.salary_min) return `$${(job.salary_min / 1000).toFixed(0)}k+`
    return null
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
        <p className="text-lg text-gray-700">{job.company}</p>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{job.location}</span>
          <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-xs">
            {job.work_type}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Briefcase className="mr-2 h-4 w-4" />
          <span className="capitalize">{job.role_type}</span>
          <span className="ml-2 capitalize">• {job.term}</span>
          {job.year && <span className="ml-2">• Class of {job.year}</span>}
        </div>

        {formatSalary() && (
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="mr-2 h-4 w-4" />
            <span>{formatSalary()}</span>
          </div>
        )}
      </div>

      {job.description && (
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {job.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Source: {job.source}
        </span>
        {showApplyButton && onApply && (
          <button
            onClick={() => onApply(job.id)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  )
}
