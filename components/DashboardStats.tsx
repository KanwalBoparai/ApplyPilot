'use client'

import { DashboardStats } from '@/types/application'
import { TrendingUp, Briefcase, Calendar, Mail } from 'lucide-react'

interface DashboardStatsProps {
  stats: DashboardStats
}

export default function DashboardStatsComponent({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Briefcase,
      color: 'bg-blue-500',
    },
    {
      title: 'Suggested Jobs',
      value: stats.suggestedJobs,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Interviews',
      value: stats.interviewsScheduled,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'This Week',
      value: stats.weeklyApplications,
      icon: Mail,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => (
        <div
          key={card.title}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">{card.title}</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {card.value}
              </p>
            </div>
            <div className={`rounded-full ${card.color} p-3`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}

      {/* Response Rate */}
      <div className="glass-card p-6 md:col-span-2 lg:col-span-4">
        <h3 className="mb-2 text-sm font-medium text-slate-300">
          Response Rate
        </h3>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-semibold text-white">
            {stats.responseRate}%
          </p>
          <p className="text-sm text-slate-400">
            Based on interviews vs applications
          </p>
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-green-500"
            style={{ width: `${Math.min(stats.responseRate, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
