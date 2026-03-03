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
    <div className="glass-card p-6 transition hover:border-cyan-300/40">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white">{job.title}</h3>
        <p className="text-lg text-slate-300">{job.company}</p>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center text-sm text-slate-300">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{job.location}</span>
          <span className="ml-2 rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-200">
            {job.work_type}
          </span>
        </div>

        <div className="flex items-center text-sm text-slate-300">
          <Briefcase className="mr-2 h-4 w-4" />
          <span className="capitalize">{job.role_type}</span>
          <span className="ml-2 capitalize">• {job.term}</span>
          {job.year && <span className="ml-2">• Class of {job.year}</span>}
        </div>

        {formatSalary() && (
          <div className="flex items-center text-sm text-slate-300">
            <DollarSign className="mr-2 h-4 w-4" />
            <span>{formatSalary()}</span>
          </div>
        )}
      </div>

      {job.description && (
        <p className="mb-4 line-clamp-3 text-sm text-slate-300">
          {job.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Source: {job.source}
        </span>
        {showApplyButton && onApply && (
          <button
            onClick={() => onApply(job.id)}
            className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  )
}
