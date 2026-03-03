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
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Filters</h2>

      {/* Work Type */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Work Type
        </label>
        <div className="space-y-2">
          {['remote', 'hybrid', 'onsite'].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300"
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
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Role Type
        </label>
        <div className="space-y-2">
          {['engineering', 'design', 'product', 'sales', 'other'].map(
            (type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300"
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
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Employment Term
        </label>
        <div className="space-y-2">
          {['fulltime', 'parttime', 'contract', 'internship'].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300"
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
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Minimum Salary
        </label>
        <input
          type="number"
          placeholder="e.g. 100000"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          onChange={(e) =>
            handleChange('minSalary', parseInt(e.target.value) || undefined)
          }
        />
      </div>

      {/* Graduation Year */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Graduation Year (for new grads)
        </label>
        <input
          type="number"
          placeholder="e.g. 2026"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          onChange={(e) =>
            handleChange('year', parseInt(e.target.value) || undefined)
          }
        />
      </div>
    </div>
  )
}
