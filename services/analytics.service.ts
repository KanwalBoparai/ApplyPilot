import { supabaseAdmin } from '@/lib/supabase'
import { DashboardStats } from '@/types/application'
import { subWeeks, startOfWeek, endOfWeek } from 'date-fns'

/**
 * Analytics Service
 * 
 * Responsibilities:
 * - Calculate dashboard metrics
 * - Track application success rates
 * - Monitor email response rates
 * - Provide insights and trends
 */

export class AnalyticsService {
  /**
   * Get dashboard statistics for a user
   */
  async getDashboardStats(userId: string): Promise<DashboardStats> {
    // Total applications
    const { count: totalApplications } = await supabaseAdmin
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .neq('status', 'suggested')

    // Suggested jobs
    const { count: suggestedJobs } = await supabaseAdmin
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'suggested')

    // Interviews scheduled
    const { count: interviewsScheduled } = await supabaseAdmin
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .in('status', ['interview', 'offer'])

    // Weekly applications (last 7 days)
    const oneWeekAgo = subWeeks(new Date(), 1).toISOString()
    const { count: weeklyApplications } = await supabaseAdmin
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'applied')
      .gte('applied_at', oneWeekAgo)

    // Email stats
    const { data: outreachData } = await supabaseAdmin
      .from('outreach')
      .select('email_status')
      .eq('user_id', userId)

    const emailsSent =
      outreachData?.filter((o: any) => o.email_status === 'sent').length || 0

    // Calculate response rate
    // Note: This is a placeholder. Real response tracking would need webhook integration
    const responseRate = totalApplications
      ? ((interviewsScheduled || 0) / (totalApplications || 1)) * 100
      : 0

    return {
      totalApplications: totalApplications || 0,
      suggestedJobs: suggestedJobs || 0,
      interviewsScheduled: interviewsScheduled || 0,
      responseRate: Math.round(responseRate * 10) / 10,
      weeklyApplications: weeklyApplications || 0,
      emailReplies: 0, // Placeholder - requires email integration
    }
  }

  /**
   * Get application trends over time
   */
  async getApplicationTrends(userId: string, weeks: number = 12) {
    const startDate = subWeeks(new Date(), weeks)

    const { data } = await supabaseAdmin
      .from('applications')
      .select('status, applied_at, created_at')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })

    // Group by week
    const weeklyData: Record<
      string,
      { applied: number; interviews: number; rejected: number }
    > = {}

    data?.forEach((app: any) => {
      const date = new Date(app.created_at)
      const weekStart = startOfWeek(date).toISOString().split('T')[0]

      if (!weeklyData[weekStart]) {
        weeklyData[weekStart] = { applied: 0, interviews: 0, rejected: 0 }
      }

      if (app.status === 'applied') weeklyData[weekStart].applied++
      if (app.status === 'interview') weeklyData[weekStart].interviews++
      if (app.status === 'rejected') weeklyData[weekStart].rejected++
    })

    return Object.entries(weeklyData).map(([week, stats]) => ({
      week,
      ...stats,
    }))
  }

  /**
   * Get top companies by application volume
   */
  async getTopCompanies(userId: string, limit: number = 10) {
    const { data } = await supabaseAdmin
      .from('applications')
      .select(
        `
        job:job_id (
          company
        )
      `
      )
      .eq('user_id', userId)
      .neq('status', 'suggested')

    if (!data) return []

    // Count applications per company
    const companyCounts: Record<string, number> = {}
    data.forEach((app: any) => {
      const company = app.job?.company
      if (company) {
        companyCounts[company] = (companyCounts[company] || 0) + 1
      }
    })

    // Sort and return top companies
    return Object.entries(companyCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([company, count]) => ({ company, count }))
  }

  /**
   * Get success rate by role type
   */
  async getSuccessRateByRoleType(userId: string) {
    const { data } = await supabaseAdmin
      .from('applications')
      .select(
        `
        status,
        job:job_id (
          role_type
        )
      `
      )
      .eq('user_id', userId)
      .neq('status', 'suggested')

    if (!data) return []

    const roleStats: Record<string, { total: number; success: number }> = {}

    data.forEach((app: any) => {
      const roleType = app.job?.role_type
      if (roleType) {
        if (!roleStats[roleType]) {
          roleStats[roleType] = { total: 0, success: 0 }
        }
        roleStats[roleType].total++
        if (['interview', 'offer'].includes(app.status)) {
          roleStats[roleType].success++
        }
      }
    })

    return Object.entries(roleStats).map(([roleType, stats]) => ({
      roleType,
      total: stats.total,
      successRate: Math.round((stats.success / stats.total) * 100),
    }))
  }
}

export const analyticsService = new AnalyticsService()
