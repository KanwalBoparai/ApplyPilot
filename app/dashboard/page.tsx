'use client'

import { useEffect, useState } from 'react'
import DashboardStatsComponent from '@/components/DashboardStats'
import { DashboardStats } from '@/types/application'
import { ApplicationWithJob } from '@/types/application'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentApplications, setRecentApplications] = useState<
    ApplicationWithJob[]
  >([])
  const [loading, setLoading] = useState(true)

  // Mock user ID - in production, get from auth
  const userId = 'demo-user-id'

  useEffect(() => {
    // Fetch dashboard data
    // For now, using mock data
    setStats({
      totalApplications: 24,
      suggestedJobs: 15,
      interviewsScheduled: 3,
      responseRate: 12.5,
      weeklyApplications: 8,
      emailReplies: 2,
    })

    setRecentApplications([])
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Track your job applications and success metrics
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="mb-8">
            <DashboardStatsComponent stats={stats} />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            href="/jobs"
            className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <h3 className="font-semibold text-gray-900">Browse Jobs</h3>
              <p className="text-sm text-gray-600">
                Find your next opportunity
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600" />
          </Link>

          <Link
            href="/settings"
            className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <h3 className="font-semibold text-gray-900">
                Upload Resume
              </h3>
              <p className="text-sm text-gray-600">
                Update your profile
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600" />
          </Link>

          <Link
            href="/dashboard"
            className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <h3 className="font-semibold text-gray-900">
                View Applications
              </h3>
              <p className="text-sm text-gray-600">
                Track your progress
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600" />
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Recent Applications</h2>
          {recentApplications.length === 0 ? (
            <p className="text-gray-600">
              No applications yet. Start applying to jobs!
            </p>
          ) : (
            <div className="space-y-4">
              {/* Application list would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
