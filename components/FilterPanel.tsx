'use client'

import { useState } from 'react'
import { JobFilters } from '@/types/job'

interface FilterPanelProps {
  onFilterChange: (filters: JobFilters) => void
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<JobFilters>({})

  const handleChange = (key: keyof JobFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="glass-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Filters</h2>

      {/* Work Type */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Work Type
        </label>
        <div className="space-y-2">
          {['remote', 'hybrid', 'onsite'].map((type) => (
            <label key={type} className="flex items-center text-slate-300">
              <input
                type="checkbox"
                className="mr-2 rounded border-slate-600 bg-slate-900"
                onChange={(e) => {
                  const current = filters.workType || []
                  const updated = e.target.checked
                    ? [...current, type as any]
                    : current.filter((t) => t !== type)
                  handleChange('workType', updated)
                }}
              />
              <span className="capitalize text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Role Type */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Role Type
        </label>
        <div className="space-y-2">
          {['engineering', 'design', 'product', 'sales', 'other'].map(
            (type) => (
              <label key={type} className="flex items-center text-slate-300">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-slate-600 bg-slate-900"
                  onChange={(e) => {
                    const current = filters.roleType || []
                    const updated = e.target.checked
                      ? [...current, type as any]
                      : current.filter((t) => t !== type)
                    handleChange('roleType', updated)
                  }}
                />
                <span className="capitalize text-sm">{type}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Term */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Employment Term
        </label>
        <div className="space-y-2">
          {['fulltime', 'parttime', 'contract', 'internship'].map((type) => (
            <label key={type} className="flex items-center text-slate-300">
              <input
                type="checkbox"
                className="mr-2 rounded border-slate-600 bg-slate-900"
                onChange={(e) => {
                  const current = filters.term || []
                  const updated = e.target.checked
                    ? [...current, type as any]
                    : current.filter((t) => t !== type)
                  handleChange('term', updated)
                }}
              />
              <span className="capitalize text-sm">
                {type === 'fulltime'
                  ? 'Full-time'
                  : type === 'parttime'
                    ? 'Part-time'
                    : type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Min Salary */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Minimum Salary
        </label>
        <input
          type="number"
          placeholder="e.g. 100000"
          className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
          onChange={(e) =>
            handleChange('minSalary', parseInt(e.target.value) || undefined)
          }
        />
      </div>

      {/* Graduation Year */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Graduation Year (for new grads)
        </label>
        <input
          type="number"
          placeholder="e.g. 2026"
          className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
          onChange={(e) =>
            handleChange('year', parseInt(e.target.value) || undefined)
          }
        />
      </div>
    </div>
  )
}
