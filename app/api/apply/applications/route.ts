import { NextRequest, NextResponse } from 'next/server'
import { applicationService } from '@/services/application.service'
import { hasSupabaseConfig } from '@/lib/runtime'
import { ensureNeonSchema, hasNeonConfig, queryNeon } from '@/lib/neon'

/**
 * GET /api/apply/applications
 * Get user's applications
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const status = request.nextUrl.searchParams.get('status')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    if (!hasSupabaseConfig && hasNeonConfig) {
      await ensureNeonSchema()

      const values: any[] = [userId]
      let statusFilter = ''

      if (status) {
        values.push(status)
        statusFilter = ` AND a.status = $${values.length}`
      }

      const applications = await queryNeon(
        `SELECT a.*, j.title AS job_title, j.company AS job_company, j.location AS job_location
         FROM applications a
         LEFT JOIN jobs j ON j.id = a.job_id
         WHERE a.user_id = $1${statusFilter}
         ORDER BY a.created_at DESC`,
        values
      )

      return NextResponse.json({ applications, mode: 'neon' })
    }

    if (!hasSupabaseConfig) {
      return NextResponse.json({
        applications: [],
        mode: 'mock',
        message: 'Supabase is not configured. Returning mock applications.',
      })
    }

    const applications = await applicationService.getUserApplications(
      userId,
      status as any
    )

    return NextResponse.json({ applications })
  } catch (error: any) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/apply/applications
 * Update application status
 */
export async function PATCH(request: NextRequest) {
  try {
    const { userId, jobId, status, notes } = await request.json()

    if (!userId || !jobId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!hasSupabaseConfig && hasNeonConfig) {
      await ensureNeonSchema()

      const existing = await queryNeon<{ id: string }>(
        'SELECT id FROM applications WHERE user_id = $1 AND job_id = $2 LIMIT 1',
        [userId, jobId]
      )

      if (existing.length > 0) {
        await queryNeon(
          `UPDATE applications
           SET status = $1,
               notes = $2,
               updated_at = now(),
               applied_at = CASE WHEN $1 = 'applied' AND applied_at IS NULL THEN now() ELSE applied_at END
           WHERE user_id = $3 AND job_id = $4`,
          [status, notes || null, userId, jobId]
        )
      } else {
        await queryNeon(
          `INSERT INTO applications (id, user_id, job_id, status, notes, applied_at, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5,
             CASE WHEN $4 = 'applied' THEN now() ELSE NULL END,
             now(), now())`,
          [crypto.randomUUID(), userId, jobId, status, notes || null]
        )
      }

      return NextResponse.json({ success: true, mode: 'neon' })
    }

    if (!hasSupabaseConfig) {
      return NextResponse.json({ success: true, mode: 'mock', userId, jobId, status, notes })
    }

    await applicationService.updateApplicationStatus({
      userId,
      jobId,
      status,
      notes,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update application' },
      { status: 500 }
    )
  }
}
