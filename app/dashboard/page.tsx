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

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [jobsRes, applicationsRes] = await Promise.all([
          fetch('/api/jobs'),
          fetch('/api/apply/applications?userId=demo'),
        ])

        const jobsData = await jobsRes.json()
        const applicationsData = await applicationsRes.json()

        const applications = applicationsData.applications || []
        const interviews = applications.filter(
          (application: any) => application.status === 'interview'
        ).length
        const weeklyApplications = applications.filter((application: any) => {
          if (!application.created_at) return false
          const createdAt = new Date(application.created_at)
          const sevenDaysAgo = new Date()
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
          return createdAt >= sevenDaysAgo
        }).length

        const totalApplications = applications.length
        const responseRate = totalApplications
          ? Number(((interviews / totalApplications) * 100).toFixed(1))
          : 0

        setStats({
          totalApplications,
          suggestedJobs: (jobsData.jobs || []).length,
          interviewsScheduled: interviews,
          responseRate,
          weeklyApplications,
          emailReplies: 0,
        })

        setRecentApplications(applications.slice(0, 5))
      } catch (error) {
        console.error('Error loading dashboard:', error)
        setStats({
          totalApplications: 0,
          suggestedJobs: 0,
          interviewsScheduled: 0,
          responseRate: 0,
          weeklyApplications: 0,
          emailReplies: 0,
        })
        setRecentApplications([])
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  if (loading) {
    return (
      <div className="app-shell flex min-h-screen items-center justify-center">
        <p className="text-slate-300">Loading...</p>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
          <p className="text-slate-300">
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
            className="glass-card group flex items-center justify-between p-6 transition hover:border-cyan-300/40"
          >
            <div>
              <h3 className="font-semibold text-white">Browse Jobs</h3>
              <p className="text-sm text-slate-300">
                Find your next opportunity
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 transition-colors group-hover:text-cyan-300" />
          </Link>

          <Link
            href="/settings"
            className="glass-card group flex items-center justify-between p-6 transition hover:border-cyan-300/40"
          >
            <div>
              <h3 className="font-semibold text-white">
                Upload Resume
              </h3>
              <p className="text-sm text-slate-300">
                Update your profile
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 transition-colors group-hover:text-cyan-300" />
          </Link>

          <Link
            href="/dashboard"
            className="glass-card group flex items-center justify-between p-6 transition hover:border-cyan-300/40"
          >
            <div>
              <h3 className="font-semibold text-white">
                View Applications
              </h3>
              <p className="text-sm text-slate-300">
                Track your progress
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 transition-colors group-hover:text-cyan-300" />
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Recent Applications</h2>
          {recentApplications.length === 0 ? (
            <p className="text-slate-300">
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
